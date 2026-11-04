import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import patientService from "../services/PatientService";
import appointmentService from "../services/AppointmentService";
import { errorMessage } from "../services/api";
import { formatDateTime } from "../utils/format";
import BookAppointment from "./BookAppointment";

function PatientDashboard() {
  const { session } = useAuth();
  const patientId = session.patientId;

  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [error, setError] = useState("");

  const loadAppointments = () =>
    patientService
      .getAppointments(patientId)
      .then(setAppointments)
      .catch((err) => setError(errorMessage(err, "Could not load appointments")));

  useEffect(() => {
    if (patientId) loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const cancel = (id) => {
    setError("");
    appointmentService
      .cancelAppointment(id)
      .then(loadAppointments)
      .catch((err) => setError(errorMessage(err)));
  };

  if (!patientId) {
    return <p className="text-red-500">This account is not linked to a patient profile.</p>;
  }

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={() => setShowBooking(!showBooking)}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 mb-6 cursor-pointer"
      >
        {showBooking ? "Close" : "Book Appointment"}
      </button>

      {showBooking && (
        <BookAppointment
          onBooked={() => {
            setShowBooking(false);
            loadAppointments();
          }}
        />
      )}

      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((appt) => (
            <li key={appt.appointmentId} className="bg-white shadow-sm border border-slate-100 p-5 rounded-2xl">
              <p>
                <strong>Doctor:</strong> Dr. {appt.doctorName}
                {appt.doctorSpecialty && ` (${appt.doctorSpecialty})`}
              </p>
              <p><strong>When:</strong> {formatDateTime(appt.appointmentDate)}</p>
              {appt.reason && <p><strong>Reason:</strong> {appt.reason}</p>}
              <p><strong>Status:</strong> {appt.status}</p>
              {appt.status === "SCHEDULED" && (
                <button onClick={() => cancel(appt.appointmentId)} className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 cursor-pointer mt-2">
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientDashboard;
