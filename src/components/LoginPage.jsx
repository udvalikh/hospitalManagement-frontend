import { useState } from "react";
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../services/api";
import PageLayout from "./layout/PageLayout";
import site from "../config/site";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) =>{

        e.preventDefault();
        setError("");

        login({ username, password })
        .then(() => navigate("/dashboard"))
        .catch((err) => {
            setError(errorMessage(err, "Invalid username or password"));
        });

    };

  return (
    <PageLayout>
    <div className="flex items-center justify-center px-4 py-16">
        <form onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-slate-900">Welcome back</h2>
          <p className="text-center text-slate-500 mb-6">Sign in to {site.name}</p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-slate-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition cursor-pointer"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-slate-600">
          No account? <Link to="/register" className="text-teal-600 font-medium">Register</Link>
        </p>

        </form>
    </div>
    </PageLayout>
  );
};

export default LoginPage
