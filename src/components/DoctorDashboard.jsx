import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import doctorService from "../services/DoctorService";
import appointmentService from "../services/AppointmentService";
import { errorMessage } from "../services/api";
import { formatDateTime } from "../utils/format";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function DoctorDashboard() {
  const { session } = useAuth();
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
      .catch((err) => setError(errorMessage(err, "Could not load appointments")));

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
      .catch((err) => setError(errorMessage(err, "Could not load your profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const toggleDay = (day) =>
    setAvailableDays((days) => (days.includes(day) ? days.filter((d) => d !== day) : [...days, day]));

  const changeStatus = (id, status) => {
    setError("");
    appointmentService
      .updateStatus(id, status)
      .then(loadAppointments)
      .catch((err) => setError(errorMessage(err)));
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
        setMessage("Availability updated");
      })
      .catch((err) => setError(errorMessage(err, "Could not update availability")));
  };

  if (!doctorId) {
    return <p className="text-red-500">This account is not linked to a doctor profile.</p>;
  }

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* Appointments Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((appt) => (
              <li key={appt.appointmentId} className="bg-white shadow-sm border border-slate-100 p-5 rounded-2xl">
                <p><strong>Patient:</strong> {appt.patientName}</p>
                <p><strong>When:</strong> {formatDateTime(appt.appointmentDate)}</p>
                {appt.reason && <p><strong>Reason:</strong> {appt.reason}</p>}
                <p><strong>Status:</strong> {appt.status}</p>
                {appt.status === "SCHEDULED" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => changeStatus(appt.appointmentId, "COMPLETED")}
                      className="bg-teal-600 text-white px-3 py-1 rounded-lg hover:bg-teal-700 cursor-pointer"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => changeStatus(appt.appointmentId, "CANCELLED")}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Availability Section */}
      {profile && (
        <div className="bg-white shadow-sm border border-slate-100 p-6 rounded-2xl w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Set Availability</h2>

          <p className="text-sm text-gray-600 mb-2">Working days (none selected = every day)</p>
          <div className="grid grid-cols-2 gap-1 mb-3">
            {DAYS.map((day) => (
              <label key={day}>
                <input type="checkbox" checked={availableDays.includes(day)} onChange={() => toggleDay(day)} />{" "}
                {day.charAt(0) + day.slice(1).toLowerCase()}
              </label>
            ))}
          </div>

          <input
            type="text"
            value={availableTime}
            placeholder="Hours, e.g. 09:00-12:00,13:00-17:00 (blank = 09:00-17:00)"
            className="border border-slate-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
            onChange={(e) => setAvailableTime(e.target.value)}
          />

          <button onClick={handleAvailabilitySubmit} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 cursor-pointer">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
