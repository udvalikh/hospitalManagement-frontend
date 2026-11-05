import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import doctorService from "../services/DoctorService";
import appointmentService from "../services/AppointmentService";
import { errorMessage } from "../services/api";
import { formatTime, todayIso } from "../utils/format";

const inputClass = "border border-slate-300 rounded-xl px-3 py-2.5 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-brand-300";

// Pick a doctor and a day, then one of that doctor's free 30-minute slots.
function BookAppointment({ onBooked }) {
  const { t, locale } = useLang();
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
      .catch((err) => setError(errorMessage(err, t("booking.doctorsFailed"))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSlot("");
    setSlots([]);
    if (!doctorId || !date) return;
    doctorService
      .getSlots(doctorId, date)
      .then(setSlots)
      .catch((err) => setError(errorMessage(err, t("booking.slotsFailed"))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    appointmentService
      .bookAppointment({ doctorId: Number(doctorId), appointmentDate: slot, reason: reason.trim() || null })
      .then(onBooked)
      .catch((err) => setError(errorMessage(err, t("booking.failed"))));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-brand-100 p-6 rounded-3xl w-full max-w-md mb-8">
      <h2 className="text-xl font-bold text-brand-900 mb-4">{t("booking.title")}</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <label className="block mb-1 text-slate-700">{t("booking.doctor")}</label>
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className={inputClass} required>
        <option value="">{t("booking.chooseDoctor")}</option>
        {doctors.map((d) => (
          <option key={d.doctorId} value={d.doctorId}>
            {t("home.doctorPrefix")} {d.firstName} {d.lastName}{d.specialty ? ` - ${d.specialty}` : ""}
          </option>
        ))}
      </select>

      <label className="block mb-1 text-slate-700">{t("booking.date")}</label>
      <input type="date" value={date} min={todayIso()} onChange={(e) => setDate(e.target.value)} className={inputClass} required />

      {doctorId && (
        <>
          <label className="block mb-1 text-slate-700">{t("booking.time")}</label>
          {slots.length === 0 ? (
            <p className="text-slate-600 mb-4">{t("booking.noSlots")}</p>
          ) : (
            <select value={slot} onChange={(e) => setSlot(e.target.value)} className={inputClass} required>
              <option value="">{t("booking.chooseTime")}</option>
              {slots.map((s) => (
                <option key={s} value={s}>{formatTime(s, locale)}</option>
              ))}
            </select>
          )}
        </>
      )}

      <label className="block mb-1 text-slate-700">{t("booking.reason")}</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className={inputClass} />

      <button type="submit" disabled={!slot} className="bg-brand-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        {t("booking.submit")}
      </button>
    </form>
  );
}

export default BookAppointment;
