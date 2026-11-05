import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../i18n/LanguageContext";
import { errorMessage } from "../services/api";
import PageLayout from "./layout/PageLayout";

const FIELDS = [
  { name: "username", type: "text", required: true, wide: true },
  { name: "password", type: "password", required: true },
  { name: "confirmPassword", type: "password", required: true },
  { name: "lastName", type: "text" },
  { name: "firstName", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "tel" },
];

// Registration always creates a patient account (the backend enforces this).
const RegisterPage = () => {
  const [form, setForm] = useState(Object.fromEntries(FIELDS.map((f) => [f.name, ""])));
  const [error, setError] = useState("");
  const { register } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError(t("register.mismatch"));
      return;
    }
    // Send optional fields as null rather than empty strings.
    const details = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() === "" ? null : v]));
    register(details)
      .then(() => navigate("/dashboard"))
      .catch((err) => setError(errorMessage(err, t("register.failed"))));
  };

  return (
    <PageLayout className="bg-brand-50/60">
      <div className="flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-100 border border-brand-50 w-full max-w-lg grid sm:grid-cols-2 gap-x-4"
        >
          <div className="sm:col-span-2 text-center">
            <img src="/logo.jpg" alt="" className="w-20 h-20 mx-auto rounded-full object-cover" />
            <h2 className="mt-4 text-2xl font-bold text-brand-900">{t("register.title")}</h2>
            <p className="text-slate-500 mb-6">{t("register.subtitle", { name: t("brand.name") })}</p>
          </div>

          {error && <p className="sm:col-span-2 text-red-600 text-sm text-center mb-4">{error}</p>}

          {FIELDS.map((f) => (
            <div className={`mb-4 ${f.wide ? "sm:col-span-2" : ""}`} key={f.name}>
              <label className="block mb-1 text-slate-700">{t(`register.${f.name}`)}</label>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
                required={f.required}
              />
            </div>
          ))}

          <button
            type="submit"
            className="sm:col-span-2 w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            {t("register.submit")}
          </button>

          <p className="sm:col-span-2 text-sm text-center mt-4 text-slate-600">
            {t("register.haveAccount")} <Link to="/login" className="text-brand-700 font-semibold">{t("nav.login")}</Link>
          </p>
        </form>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
