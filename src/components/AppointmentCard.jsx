import { useLang } from "../i18n/LanguageContext";
import { formatDateTime } from "../utils/format";

const STATUS_STYLES = {
  SCHEDULED: "bg-brand-100 text-brand-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-slate-200 text-slate-600",
};

// One appointment in a list. `who` is the other person (doctor for patients, patient for doctors);
// action buttons are passed as children.
export default function AppointmentCard({ appt, who, whoLabel, children }) {
  const { t, locale } = useLang();
  return (
    <li className="bg-white shadow-sm border border-brand-100 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div className="space-y-1">
        <p><span className="font-semibold text-brand-900">{whoLabel}:</span> {who}</p>
        <p><span className="font-semibold text-brand-900">{t("appointment.when")}:</span> {formatDateTime(appt.appointmentDate, locale)}</p>
        {appt.reason && <p><span className="font-semibold text-brand-900">{t("appointment.reason")}:</span> {appt.reason}</p>}
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_STYLES[appt.status] || ""}`}>
          {t(`appointment.statuses.${appt.status}`)}
        </span>
        {children}
      </div>
    </li>
  );
}
