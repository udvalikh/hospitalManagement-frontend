import { useEffect, useState } from "react";
import doctorService from "../services/DoctorService";
import appointmentService from "../services/AppointmentService";
import { errorMessage } from "../services/api";
import { formatTime, todayIso } from "../utils/format";

// Pick a doctor and a day, then one of that doctor's free 30-minute slots.
function BookAppointment({ onBooked }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState(todayIso());
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    doctorService
      .listDoctors()
      .then(setDoctors)
      .catch((err) => setError(errorMessage(err, "Could not load doctors")));
  }, []);

  useEffect(() => {
    setSlot("");
    setSlots([]);
    if (!doctorId || !date) return;
    doctorService
      .getSlots(doctorId, date)
      .then(setSlots)
      .catch((err) => setError(errorMessage(err, "Could not load free times")));
  }, [doctorId, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    appointmentService
      .bookAppointment({ doctorId: Number(doctorId), appointmentDate: slot, reason: reason.trim() || null })
      .then(onBooked)
      .catch((err) => setError(errorMessage(err, "Could not book the appointment")));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg w-96 mb-8">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <label className="block mb-1">Doctor</label>
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="border p-2 w-full mb-3" required>
        <option value="">Choose a doctor</option>
        {doctors.map((d) => (
          <option key={d.doctorId} value={d.doctorId}>
            Dr. {d.firstName} {d.lastName}{d.specialty ? ` - ${d.specialty}` : ""}
          </option>
        ))}
      </select>

      <label className="block mb-1">Date</label>
      <input
        type="date"
        value={date}
        min={todayIso()}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-3"
        required
      />

      {doctorId && (
        <>
          <label className="block mb-1">Time</label>
          {slots.length === 0 ? (
            <p className="text-gray-600 mb-3">No free times that day</p>
          ) : (
            <select value={slot} onChange={(e) => setSlot(e.target.value)} className="border p-2 w-full mb-3" required>
              <option value="">Choose a time</option>
              {slots.map((s) => (
                <option key={s} value={s}>{formatTime(s)}</option>
              ))}
            </select>
          )}
        </>
      )}

      <label className="block mb-1">Reason (optional)</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="border p-2 w-full mb-3" />

      <button type="submit" disabled={!slot} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        Book
      </button>
    </form>
  );
}

export default BookAppointment;
