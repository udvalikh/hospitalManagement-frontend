import api from "./api";

// The backend sends roles as "ROLE_PATIENT"; the UI works with "PATIENT".
const toRole = (role) => (role ? role.replace(/^ROLE_/, "") : null);

/** Saves the /login, /register or /me response to localStorage and returns the session. */
function saveSession(data) {
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  const session = {
    username: data.user?.username,
    role: toRole(data.user?.role),
    doctorId: data.doctorId ?? null,
    patientId: data.patientId ?? null,
  };
  localStorage.setItem("session", JSON.stringify(session));
  return session;
}

const authService = {
  login: ({ username, password }) =>
    api.post("/login", { username, password }).then((res) => saveSession(res.data)),

  // Always creates a patient account. firstName, lastName, email and phone are optional.
  register: ({ username, password, confirmPassword, firstName, lastName, email, phone }) =>
    api
      .post("/register", { username, password, confirmPassword, firstName, lastName, email, phone })
      .then((res) => saveSession(res.data)),

  // Restores the session from the stored token (call on page load).
  me: () => api.get("/me").then((res) => saveSession(res.data)),

  getStoredSession: () => {
    if (!localStorage.getItem("token")) return null;
    try {
      return JSON.parse(localStorage.getItem("session"));
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session");
  },
};

export default authService;
