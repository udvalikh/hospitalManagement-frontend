import { createContext, useContext } from "react";

// { session: { username, role, doctorId, patientId } | null, loading, login, register, logout }
export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);
