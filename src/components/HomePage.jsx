import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import doctorService from '../services/DoctorService';
import site from '../config/site';
import PageLayout from './layout/PageLayout';
import Icon from './layout/Icon';

const DEPARTMENTS = [
  { icon: "heart", name: "Cardiology", text: "Diagnosis and treatment of heart and blood vessel conditions." },
  { icon: "smile", name: "Pediatrics", text: "Gentle, attentive care for infants, children and teenagers." },
  { icon: "bolt", name: "Emergency Care", text: "Urgent medical help around the clock, every day of the year." },
  { icon: "beaker", name: "Laboratory", text: "Blood tests and diagnostics with fast, reliable results." },
  { icon: "shield", name: "Internal Medicine", text: "Prevention and treatment of adult diseases and chronic conditions." },
  { icon: "users", name: "Family Medicine", text: "Ongoing care and check-ups for the whole family." },
];

const REASONS = [
  { title: "Experienced specialists", text: "Doctors across key specialties, focused on safe and respectful care." },
  { title: "Book online in minutes", text: "See each doctor's free times and pick the one that suits you." },
  { title: "Your appointments in one place", text: "View, reschedule or cancel your visits from your own dashboard." },
  { title: "Emergency care 24/7", text: `Day or night, call ${site.emergencyPhone} or come straight to our emergency department.` },
];

const STEPS = [
  { icon: "users", title: "Create an account", text: "Register as a patient in under a minute." },
  { icon: "calendar", title: "Choose a doctor & time", text: "Pick a specialist and one of their free slots." },
  { icon: "check", title: "Visit the hospital", text: "Arrive at your time - we'll be ready for you." },
];

const formatDays = (days) =>
  days && days.length > 0 ? days.map((d) => d.charAt(0) + d.slice(1, 3).toLowerCase()).join(", ") : "Every day";

const initials = (d) => `${d.firstName?.[0] ?? ""}${d.lastName?.[0] ?? ""}`;

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="max-w-2xl mx-auto text-center mb-12">
    <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm">{eyebrow}</p>
    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">{title}</h2>
    {text && <p className="mt-4 text-slate-600">{text}</p>}
  </div>
);

const HomePage = () => {
  const { session } = useAuth();
  const location = useLocation();
  const [doctors, setDoctors] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  // Patients book from the dashboard; visitors log in first.
  const bookLink = session ? "/dashboard" : "/login";

  useEffect(() => {
    doctorService.listDoctors().then(setDoctors).catch(() => setDoctors([]));
    doctorService.getSpecialties().then(setSpecialties).catch(() => {});
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
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-sky-100 blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium">
              <Icon name="heart" className="w-4 h-4" /> {site.tagline}
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Welcome to <span className="text-teal-600">{site.name}</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Quality healthcare with compassion. Find the right specialist and book your appointment online -
              no phone queues, no waiting.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={bookLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition">
                Book an Appointment <Icon name="arrow" className="w-5 h-5" />
              </Link>
              <Link to={{ pathname: "/", hash: "#doctors" }} className="px-6 py-3 rounded-xl bg-white text-slate-800 font-semibold border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition">
                Find a Doctor
              </Link>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 p-8 pb-16 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Book in 3 easy steps</h3>
              <ol className="mt-6 space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-teal-50 text-teal-600">
                      <Icon name={s.icon} />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{i + 1}. {s.title}</p>
                      <p className="text-sm text-slate-600">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="absolute -bottom-6 right-6 hidden sm:flex items-center gap-3 bg-red-600 text-white rounded-2xl px-5 py-4 shadow-xl">
              <Icon name="phone" />
              <div>
                <p className="text-xs uppercase tracking-wider text-red-100">Emergency</p>
                <p className="text-xl font-bold">{site.emergencyPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: doctors ? doctors.length : "-", label: "Specialist doctors" },
            { value: specialties.length || "-", label: "Medical specialties" },
            { value: "24/7", label: "Emergency care" },
            { value: "30 min", label: "Appointment slots" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-teal-100 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="scroll-mt-28 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Our Departments"
            title="Care for every stage of life"
            text="From routine check-ups to urgent care, our departments work together to look after you and your family."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((d) => (
              <div key={d.name} className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white group-hover:scale-110 transition">
                  <Icon name={d.icon} className="w-7 h-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{d.name}</h3>
                <p className="mt-2 text-slate-600">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors (live from the API) */}
      <section id="doctors" className="scroll-mt-28 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Our Doctors" title="Meet our specialists" text="See when each doctor works and book a time that fits your schedule." />

          {doctors === null && <p className="text-center text-slate-500">Loading doctors...</p>}
          {doctors?.length === 0 && <p className="text-center text-slate-500">Doctor information is not available right now.</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors?.map((d) => (
              <div key={d.doctorId} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition">
                <div className="h-24 bg-gradient-to-r from-teal-500 to-sky-500" />
                <div className="px-6 pb-6 -mt-12">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold">
                      {initials(d)}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Dr. {d.firstName} {d.lastName}</h3>
                  <p className="text-teal-600 font-medium">{d.specialty || "General Practice"}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><Icon name="calendar" className="w-4 h-4 text-slate-400" />{formatDays(d.availableDays)}</li>
                    <li className="flex items-center gap-2"><Icon name="clock" className="w-4 h-4 text-slate-400" />{(d.availableTime || "09:00-17:00").replaceAll(",", ", ")}</li>
                  </ul>
                  <Link to={bookLink} className="mt-6 block text-center px-4 py-2 rounded-xl border border-teal-600 text-teal-700 font-semibold hover:bg-teal-600 hover:text-white transition">
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / why us */}
      <section id="about" className="scroll-mt-28 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal-600 to-sky-600 p-10 flex flex-col justify-end text-white shadow-2xl">
              <svg viewBox="0 0 32 32" className="w-20 h-20 mb-auto opacity-90" aria-hidden="true">
                <path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill="currentColor" />
              </svg>
              <p className="text-3xl font-bold">{site.name}</p>
              <p className="mt-2 text-teal-100">{site.tagline}.</p>
            </div>
          </div>
          <div>
            <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm">Why Choose Us</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">Healthcare built around you</h2>
            <p className="mt-4 text-slate-600">
              At {site.name} we combine skilled doctors with simple online tools, so getting care is as easy as possible.
            </p>
            <ul className="mt-8 space-y-6">
              {REASONS.map((r) => (
                <li key={r.title} className="flex gap-4">
                  <Icon name="check" className="w-7 h-7 shrink-0 text-teal-600" />
                  <div>
                    <p className="font-semibold text-slate-900">{r.title}</p>
                    <p className="text-slate-600">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-r from-teal-600 to-sky-600">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold">Need to see a doctor?</h2>
            <p className="mt-2 text-teal-50">Book your appointment online today - it only takes a minute.</p>
          </div>
          <Link to={session ? "/dashboard" : "/register"} className="px-8 py-4 rounded-xl bg-white text-teal-700 font-bold shadow-lg hover:bg-teal-50 transition">
            {session ? "Go to Dashboard" : "Create Free Account"}
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-28 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Contact Us" title="We're here to help" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "phone", title: "Call Us", lines: [site.phone, `Emergency: ${site.emergencyPhone}`] },
              { icon: "pin", title: "Visit Us", lines: [site.address] },
              { icon: "clock", title: "Opening Hours", lines: site.hours.map((h) => `${h.days}: ${h.time}`) },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
                <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 text-teal-600">
                  <Icon name={c.icon} className="w-7 h-7" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-slate-600 mt-1">{l}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageLayout>
  )
}

export default HomePage
