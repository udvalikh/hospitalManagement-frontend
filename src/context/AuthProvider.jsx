import { useEffect, useState } from "react";
import authService from "../services/AuthService";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getStoredSession());
  // If a token is stored, check it with GET /me before trusting it.
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    authService
      .me()
      .then(setSession)
      .catch(() => {
        authService.logout();
        setSession(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    session,
    loading,
    login: (credentials) => authService.login(credentials).then((s) => (setSession(s), s)),
    register: (details) => authService.register(details).then((s) => (setSession(s), s)),
    logout: () => {
      authService.logout();
      setSession(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
