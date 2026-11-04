import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../services/api";
import PageLayout from "./layout/PageLayout";
import site from "../config/site";

const FIELDS = [
  { name: "username", label: "Username", type: "text", required: true, wide: true },
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
    <PageLayout>
      <div className="flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg grid sm:grid-cols-2 gap-x-4"
        >
          <div className="sm:col-span-2">
            <h2 className="text-2xl font-bold text-center text-slate-900">Create your account</h2>
            <p className="text-center text-slate-500 mb-6">Register as a patient at {site.name}</p>
          </div>

          {error && <p className="sm:col-span-2 text-red-500 text-sm text-center mb-4">{error}</p>}

          {FIELDS.map((f) => (
            <div className={`mb-4 ${f.wide ? "sm:col-span-2" : ""}`} key={f.name}>
              <label className="block mb-1 text-slate-700">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
                required={f.required}
              />
            </div>
          ))}

          <button
            type="submit"
            className="sm:col-span-2 w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition cursor-pointer"
          >
            Create Account
          </button>

          <p className="sm:col-span-2 text-sm text-center mt-4 text-slate-600">
            Already registered? <Link to="/login" className="text-teal-600 font-medium">Login</Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
