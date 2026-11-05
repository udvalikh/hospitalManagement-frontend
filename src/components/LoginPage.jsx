import { useState } from "react";
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../i18n/LanguageContext";
import { errorMessage } from "../services/api";
import PageLayout from "./layout/PageLayout";

const inputClass = "w-full border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-300";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const { t } = useLang();
    const navigate = useNavigate();

    const handleLogin = (e) =>{

        e.preventDefault();
        setError("");

        login({ username, password })
        .then(() => navigate("/dashboard"))
        .catch((err) => {
            // Wrong username/password comes back as 401; show it in the current language.
            setError(err.response?.status === 401 ? t("login.invalid") : errorMessage(err, t("error")));
        });

    };

  return (
    <PageLayout className="bg-brand-50/60">
    <div className="flex items-center justify-center px-4 py-16">
        <form onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-100 border border-brand-50 w-full max-w-md"
        >
          <img src="/logo.jpg" alt="" className="w-20 h-20 mx-auto rounded-full object-cover" />
          <h2 className="mt-4 text-2xl font-bold text-center text-brand-900">{t("login.title")}</h2>
          <p className="text-center text-slate-500 mb-6">{t("login.subtitle", { name: t("brand.name") })}</p>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-slate-700">{t("login.username")}</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} required />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-slate-700">{t("login.password")}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-600 text-white py-3 rounded-full font-semibold hover:bg-brand-700 transition cursor-pointer"
        >
          {t("login.submit")}
        </button>

        <p className="text-sm text-center mt-4 text-slate-600">
          {t("login.noAccount")} <Link to="/register" className="text-red-600 font-semibold">{t("nav.register")}</Link>
        </p>

        </form>
    </div>
    </PageLayout>
  );
};

export default LoginPage
