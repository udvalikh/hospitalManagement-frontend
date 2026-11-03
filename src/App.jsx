import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashBoard from './components/Dashboard';
import AuthProvider from './context/AuthProvider';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }) {
  const { session, loading } = useAuth();
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return session ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<RequireAuth><DashBoard /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
