import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../i18n/LanguageContext";
import doctorService from "../services/DoctorService";
import appointmentService from "../services/AppointmentService";
import { errorMessage } from "../services/api";
import AppointmentCard from "./AppointmentCard";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function DoctorDashboard() {
  const { session } = useAuth();
  const { t } = useLang();
  const doctorId = session.doctorId;

  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTime, setAvailableTime] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadAppointments = () =>
    doctorService
      .getAppointments(doctorId)
      .then(setAppointments)
      .catch((err) => setError(errorMessage(err, t("doctorDash.loadFailed"))));

  useEffect(() => {
    if (!doctorId) return;
    loadAppointments();
    doctorService
      .getDoctor(doctorId)
      .then((doctor) => {
        setProfile(doctor);
        setAvailableDays(doctor.availableDays || []);
        setAvailableTime(doctor.availableTime || "");
      })
      .catch((err) => setError(errorMessage(err, t("doctorDash.profileFailed"))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const toggleDay = (day) =>
    setAvailableDays((days) => (days.includes(day) ? days.filter((d) => d !== day) : [...days, day]));

  const changeStatus = (id, status) => {
    setError("");
    appointmentService
      .updateStatus(id, status)
      .then(loadAppointments)
      .catch((err) => setError(errorMessage(err, t("error"))));
  };

  const handleAvailabilitySubmit = () => {
    setError("");
    setMessage("");
    // PUT /doctors/{id} replaces the whole profile, so send the existing fields too.
    doctorService
      .updateDoctor(doctorId, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        specialty: profile.specialty,
        phone: profile.phone,
        availableDays,
        availableTime: availableTime.trim() || null,
      })
      .then((doctor) => {
        setProfile(doctor);
        setMessage(t("doctorDash.saved"));
      })
      .catch((err) => setError(errorMessage(err, t("doctorDash.updateFailed"))));
  };

  if (!doctorId) {
    return <p className="text-red-600">{t("doctorDash.notLinked")}</p>;
  }

  return (
    <div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-700 mb-4">{message}</p>}

      {/* Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-brand-900 mb-4">{t("doctorDash.appointments")}</h2>

        {appointments.length === 0 ? (
          <p className="text-slate-600">{t("doctorDash.none")}</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((appt) => (
              <AppointmentCard
                key={appt.appointmentId}
                appt={appt}
                who={appt.patientName}
                whoLabel={t("appointment.patient")}
              >
                {appt.status === "SCHEDULED" && (
                  <>
                    <button
                      onClick={() => changeStatus(appt.appointmentId, "COMPLETED")}
                      className="bg-brand-600 text-white px-4 py-1.5 rounded-full hover:bg-brand-700 cursor-pointer"
                    >
                      {t("appointment.complete")}
                    </button>
                    <button
                      onClick={() => changeStatus(appt.appointmentId, "CANCELLED")}
                      className="bg-red-600 text-white px-4 py-1.5 rounded-full hover:bg-red-700 cursor-pointer"
                    >
                      {t("appointment.cancel")}
                    </button>
                  </>
                )}
              </AppointmentCard>
            ))}
          </ul>
        )}
      </div>

      {/* Availability */}
      {profile && (
        <div className="bg-white shadow-sm border border-brand-100 p-6 rounded-3xl w-full max-w-md">
          <h2 className="text-xl font-bold text-brand-900 mb-4">{t("doctorDash.availability")}</h2>

          <p className="text-sm text-slate-600 mb-2">{t("doctorDash.workingDays")}</p>
          <div className="grid grid-cols-2 gap-1 mb-4">
            {DAYS.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input type="checkbox" className="accent-brand-600" checked={availableDays.includes(day)} onChange={() => toggleDay(day)} />
                {t(`days.${day}`)}
              </label>
            ))}
          </div>

          <input
            type="text"
            value={availableTime}
            placeholder={t("doctorDash.hoursPlaceholder")}
            className="border border-slate-300 rounded-xl px-3 py-2.5 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-brand-300"
            onChange={(e) => setAvailableTime(e.target.value)}
          />

          <button onClick={handleAvailabilitySubmit} className="bg-brand-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-700 cursor-pointer">
            {t("doctorDash.save")}
          </button>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
