// "2030-01-07T09:30:00" -> "1/7/2030, 9:30 AM" (in the user's locale)
export const formatDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "";

// "2030-01-07T09:30:00" -> "9:30 AM"
export const formatTime = (iso) =>
  iso ? new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "";

// Today's date as "YYYY-MM-DD" in local time (for <input type="date">).
export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
