import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../i18n/LanguageContext";
import patientService from "../services/PatientService";
import appointmentService from "../services/AppointmentService";
import { errorMessage } from "../services/api";
import BookAppointment from "./BookAppointment";
import AppointmentCard from "./AppointmentCard";

function PatientDashboard() {
  const { session } = useAuth();
  const { t } = useLang();
  const patientId = session.patientId;

  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [error, setError] = useState("");

  const loadAppointments = () =>
    patientService
      .getAppointments(patientId)
      .then(setAppointments)
      .catch((err) => setError(errorMessage(err, t("patient.loadFailed"))));

  useEffect(() => {
    if (patientId) loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const cancel = (id) => {
    setError("");
    appointmentService
      .cancelAppointment(id)
      .then(loadAppointments)
      .catch((err) => setError(errorMessage(err, t("error"))));
  };

  if (!patientId) {
    return <p className="text-red-600">{t("patient.notLinked")}</p>;
  }

  return (
    <div>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        onClick={() => setShowBooking(!showBooking)}
        className="px-6 py-2.5 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 mb-6 cursor-pointer"
      >
        {showBooking ? t("patient.close") : t("patient.book")}
      </button>

      {showBooking && (
        <BookAppointment
          onBooked={() => {
            setShowBooking(false);
            loadAppointments();
          }}
        />
      )}

      <h2 className="text-xl font-bold text-brand-900 mb-4">{t("patient.myAppointments")}</h2>
      {appointments.length === 0 ? (
        <p className="text-slate-600">{t("patient.none")}</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.appointmentId}
              appt={appt}
              who={`${t("home.doctorPrefix")} ${appt.doctorName}${appt.doctorSpecialty ? ` (${appt.doctorSpecialty})` : ""}`}
              whoLabel={t("appointment.doctor")}
            >
              {appt.status === "SCHEDULED" && (
                <button onClick={() => cancel(appt.appointmentId)} className="bg-red-600 text-white px-4 py-1.5 rounded-full hover:bg-red-700 cursor-pointer">
                  {t("appointment.cancel")}
                </button>
              )}
            </AppointmentCard>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientDashboard;
