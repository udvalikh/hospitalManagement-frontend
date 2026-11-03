import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashBoard from './components/Dashboard';

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={
          localStorage.getItem("token") ? (
            <DashBoard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
        />
      </Routes>
    </Router>
  )
}

export default App
