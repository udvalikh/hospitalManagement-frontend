import { useState } from "react";
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../services/api";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          No account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>

        </form>
    </div>
  );
};

export default LoginPage
