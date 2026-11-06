import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useLang } from '../i18n/LanguageContext';
import doctorService from '../services/DoctorService';
import site, { openingHours } from '../config/site';
import { formatDays } from '../utils/format';
import PageLayout from './layout/PageLayout';
import Icon from './layout/Icon';

const STEP_ICONS = ["user", "calendar", "check"];

const initials = (d) => `${d.firstName?.[0] ?? ""}${d.lastName?.[0] ?? ""}`;

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="max-w-2xl mx-auto text-center mb-12">
    {eyebrow && <p className="mb-2 text-red-600 font-semibold tracking-widest uppercase text-sm">{eyebrow}</p>}
    <h2 className="text-3xl md:text-4xl font-bold text-brand-900">{title}</h2>
    {text && <p className="mt-4 text-slate-600">{text}</p>}
  </div>
);

const HomePage = () => {
  const { session } = useAuth();
  const { t, lang } = useLang();
  const location = useLocation();
  const [doctors, setDoctors] = useState(null);

  // Patients book from the dashboard; visitors log in first.
  const bookLink = session ? "/dashboard" : "/login";
  const services = t("home.services");

  useEffect(() => {
    doctorService.listDoctors().then(setDoctors).catch(() => setDoctors([]));
  }, []);

  // Scroll to #section when the navbar links here.
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <PageLayout className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-red-50">
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand-100 blur-3xl opacity-70" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-red-100 blur-3xl opacity-50" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm text-brand-700 text-sm font-medium">
              <Icon name="heart" className="w-4 h-4 text-red-600" /> {t("brand.tagline")}
            </span>
            <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold text-brand-900 leading-tight">
              {t("home.heroTitle")} <span className="text-red-600">{t("home.heroHighlight")}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">{t("home.heroText")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={bookLink} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-red-600 text-white font-semibold shadow-lg shadow-red-600/25 hover:bg-red-700 transition">
                <Icon name="calendar" className="w-5 h-5" /> {t("home.book")}
              </Link>
              <Link to={{ pathname: "/", hash: "#doctors" }} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-800 font-semibold border border-brand-200 hover:border-brand-400 transition">
                {t("home.findDoctor")} <Icon name="arrow" className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Logo + booking steps card */}
          <div className="relative">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-brand-200/60 p-8 pb-16 border border-brand-50">
              <div className="flex items-center gap-4 pb-6 border-b border-brand-50">
                <img src="/logo.jpg" alt="" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <p className="text-xl font-bold text-brand-900">{t("brand.name")}</p>
                  <p className="text-sm text-slate-500">{t("home.stepsTitle")}</p>
                </div>
              </div>
              <ol className="mt-6 space-y-5">
                {t("home.steps").map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-brand-50 text-brand-600">
                      <Icon name={STEP_ICONS[i]} />
                    </span>
                    <div>
                      <p className="font-semibold text-brand-900">{i + 1}. {s.title}</p>
                      <p className="text-sm text-slate-600">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <a href={`tel:${site.emergencyPhone}`} className="absolute -bottom-6 right-6 hidden sm:flex items-center gap-3 bg-red-600 text-white rounded-2xl px-5 py-4 shadow-xl hover:bg-red-700">
              <Icon name="phone" />
              <div>
                <p className="text-xs uppercase tracking-wider text-red-100">{t("home.emergency")}</p>
                <p className="text-xl font-bold">{site.emergencyPhone}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-brand-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: doctors ? doctors.length : "-", label: t("home.stats.doctors") },
            { value: services.length, label: t("home.stats.services") },
            { value: "24/7", label: t("home.stats.online") },
            { value: t("home.stats.slotValue"), label: t("home.stats.slot") },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-brand-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-32 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow={t("home.servicesEyebrow")} title={t("home.servicesTitle")} text={t("home.servicesText")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group p-8 rounded-3xl border border-brand-100 bg-brand-50/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white group-hover:bg-red-600 transition">
                  <Icon name={s.icon} className="w-7 h-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-brand-900">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment / ultrasound (photos in public/images) */}
      <section id="equipment" className="scroll-mt-32 py-20 bg-brand-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-brand-600/30 blur-2xl" />
            <img
              src="/images/ultrasound.jpg"
              alt={t("home.equipmentTitle")}
              className="relative w-full max-w-lg mx-auto aspect-square object-cover rounded-[2rem] shadow-2xl"
            />
          </div>

          <div>
            <p className="text-red-400 font-semibold tracking-widest uppercase text-sm">{t("home.equipmentEyebrow")}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">{t("home.equipmentTitle")}</h2>
            <p className="mt-4 text-brand-200">{t("home.equipmentText")}</p>

            <ul className="mt-6 space-y-3">
              {t("home.equipmentFeatures").map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Icon name="check" className="w-6 h-6 shrink-0 text-red-400" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-4 flex flex-col sm:flex-row gap-5 items-center">
              <img src="/images/voluson-e10.jpg" alt="Voluson E10" className="w-full sm:w-56 rounded-2xl object-cover" />
              <div>
                <p className="text-xl font-bold">Voluson E10</p>
                <p className="mt-1 text-sm text-brand-200">{t("home.machineText")}</p>
                <Link to={bookLink} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 font-semibold hover:bg-red-700 transition">
                  <Icon name="calendar" className="w-5 h-5" /> {t("home.book")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors (live from the API) */}
      <section id="doctors" className="scroll-mt-32 py-20 bg-brand-50/60">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title={t("home.doctorsTitle")} text={t("home.doctorsText")} />

          {doctors === null && <p className="text-center text-slate-500">{t("home.doctorsLoading")}</p>}
          {doctors?.length === 0 && <p className="text-center text-slate-500">{t("home.doctorsNone")}</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors?.map((d) => (
              <div key={d.doctorId} className="bg-white rounded-3xl shadow-sm border border-brand-100 overflow-hidden hover:shadow-xl transition">
                <div className="h-24 bg-gradient-to-r from-brand-600 to-brand-400" />
                <div className="px-6 pb-6 -mt-12">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-brand-50 text-brand-700 flex items-center justify-center text-2xl font-bold">
                      {initials(d)}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-brand-900">{t("home.doctorPrefix")} {d.firstName} {d.lastName}</h3>
                  <p className="text-red-600 font-medium">{d.specialty || t("home.generalPractice")}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><Icon name="calendar" className="w-4 h-4 text-brand-400" />{formatDays(d.availableDays, t)}</li>
                    <li className="flex items-center gap-2"><Icon name="clock" className="w-4 h-4 text-brand-400" />{(d.availableTime || "09:00-17:00").replaceAll(",", ", ")}</li>
                  </ul>
                  <Link to={bookLink} className="mt-6 block text-center px-4 py-2.5 rounded-full border border-brand-600 text-brand-700 font-semibold hover:bg-brand-600 hover:text-white transition">
                    {t("home.book")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advice for expecting mothers */}
      <section id="advice" className="scroll-mt-32 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow={t("home.adviceEyebrow")} title={t("home.adviceTitle")} text={t("home.adviceText")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t("home.advice").map((a, i) => (
              <div key={a.title} className="relative p-7 rounded-3xl bg-white border border-brand-100 shadow-sm">
                <span className="text-5xl font-extrabold text-brand-100">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-brand-900">{a.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / why us */}
      <section id="about" className="scroll-mt-32 py-20 bg-brand-50/60">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {/* Clinic banner (public/images/clinic-banner.jpg) */}
            <img
              src="/images/clinic-banner.jpg"
              alt={t("brand.name")}
              className="w-full rounded-3xl shadow-2xl shadow-brand-200 object-cover"
            />
            <img
              src="/logo.jpg"
              alt=""
              className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white p-1 shadow-xl hidden sm:block"
            />
          </div>
          <div>
            <p className="text-red-600 font-semibold tracking-widest uppercase text-sm">{t("home.aboutEyebrow")}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-900">{t("home.aboutTitle")}</h2>
            <p className="mt-4 text-slate-600">{t("home.aboutText", { name: t("brand.name") })}</p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-6">
              {t("home.reasons").map((r) => (
                <li key={r.title} className="flex gap-3">
                  <Icon name="check" className="w-7 h-7 shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold text-brand-900">{r.title}</p>
                    <p className="text-sm text-slate-600">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-500">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold">{t("home.ctaTitle")}</h2>
            <p className="mt-2 text-brand-100">{t("home.ctaText")}</p>
          </div>
          <Link to={session ? "/dashboard" : "/register"} className="px-8 py-4 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition">
            {session ? t("home.ctaDashboard") : t("home.ctaRegister")}
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-32 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title={t("home.contactTitle")} />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-brand-50/60 rounded-3xl p-8 text-center">
              <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-white text-brand-600 shadow-sm"><Icon name="phone" className="w-7 h-7" /></span>
              <h3 className="mt-4 text-lg font-bold text-brand-900">{t("home.contactCall")}</h3>
              <p className="text-slate-600 mt-1">{site.phone}</p>
              <p className="text-red-600 font-semibold mt-1">{t("home.contactEmergency", { phone: site.emergencyPhone })}</p>
            </div>
            <div className="bg-brand-50/60 rounded-3xl p-8 text-center">
              <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-white text-brand-600 shadow-sm"><Icon name="pin" className="w-7 h-7" /></span>
              <h3 className="mt-4 text-lg font-bold text-brand-900">{t("home.contactVisit")}</h3>
              <p className="text-slate-600 mt-1">{site.address[lang]}</p>
              {site.mapUrl && (
                <a href={site.mapUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-brand-700 font-semibold hover:underline">
                  {t("home.openMap")}
                </a>
              )}
            </div>
            <div className="bg-brand-50/60 rounded-3xl p-8 text-center">
              <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-white text-brand-600 shadow-sm"><Icon name="clock" className="w-7 h-7" /></span>
              <h3 className="mt-4 text-lg font-bold text-brand-900">{t("home.contactHours")}</h3>
              {openingHours(t).map((h) => (
                <p key={h.label} className="text-slate-600 mt-1">{h.label}: {h.time}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}

export default HomePage
