import axios from "axios";

const TOKEN_KEY = "token";

// One shared client for every backend call. Base URL comes from .env (VITE_REMOTE_API).
const api = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API || "http://localhost:9090",
});

// Attach the JWT to every request once the user is logged in.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// An expired or invalid token means the session is over: clear it and go to the login page.
// (Skipped for /login itself so a wrong password can show its error message.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";
    if (status === 401 && !url.endsWith("/login") && localStorage.getItem(TOKEN_KEY)) {
      localStorage.clear();
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

/**
 * Turns a backend error into a readable message.
 * The API returns { message, fieldErrors? } for every error.
 */
export function errorMessage(error, fallback = "Something went wrong") {
  const data = error?.response?.data;
  if (data?.fieldErrors) {
    return Object.values(data.fieldErrors).join(", ");
  }
  return data?.message || fallback;
}

export default api;
