import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../services/api";

const FIELDS = [
  { name: "username", label: "Username", type: "text", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
];

// Registration always creates a patient account (the backend enforces this).
const RegisterPage = () => {
  const [form, setForm] = useState(Object.fromEntries(FIELDS.map((f) => [f.name, ""])));
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Send optional fields as null rather than empty strings.
    const details = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() === "" ? null : v]));
    register(details)
      .then(() => navigate("/dashboard"))
      .catch((err) => setError(errorMessage(err, "Registration failed")));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {FIELDS.map((f) => (
          <div className="mb-4" key={f.name}>
            <label className="block mb-1 text-gray-700">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required={f.required}
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already registered? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
