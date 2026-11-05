// Dates come from the API as ISO local time, e.g. "2030-01-07T09:30:00".
// Pass the locale from useLang() ("mn-MN" or "en-US").
// Browsers don't ship Mongolian date formats, so Mongolian uses the local "2030.01.07 09:30" style.

const pad = (n) => String(n).padStart(2, "0");
const isMn = (locale) => locale?.startsWith("mn");
const mnTime = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

// -> "2030.01.07 09:30" / "Jan 7, 2030, 9:30 AM"
export const formatDateTime = (iso, locale) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isMn(locale)) return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${mnTime(d)}`;
  return d.toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" });
};

// -> "09:30" / "9:30 AM"
export const formatTime = (iso, locale) => {
  if (!iso) return "";
  const d = new Date(iso);
  return isMn(locale) ? mnTime(d) : d.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
};

// Today's date as "YYYY-MM-DD" in local time (for <input type="date">).
export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// ["TUESDAY","THURSDAY"] -> "Мягмар, Пүрэв" (empty = every day). t comes from useLang().
export const formatDays = (days, t) =>
  days && days.length > 0 ? days.map((d) => t(`days.${d}`)).join(", ") : t("days.everyDay");
