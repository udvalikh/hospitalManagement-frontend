import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../i18n/LanguageContext";
import site from "../../config/site";
import Logo from "./Logo";
import Icon from "./Icon";

// Section links point at anchors on the home page; HomePage scrolls to the hash.
const LINKS = [
  { key: "home", hash: "" },
  { key: "services", hash: "#services" },
  { key: "doctors", hash: "#doctors" },
  { key: "advice", hash: "#advice" },
  { key: "about", hash: "#about" },
  { key: "contact", hash: "#contact" },
];

function LanguageSwitch({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center rounded-full border border-current/30 overflow-hidden text-xs font-semibold ${className}`}>
      {["mn", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 cursor-pointer ${lang === l ? "bg-white text-brand-700" : "opacity-80 hover:opacity-100"}`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { session, logout } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const authButtons = session ? (
    <>
      <Link to="/dashboard" className="px-4 py-2 rounded-full text-brand-700 font-semibold hover:bg-brand-50">
        {t("nav.dashboard")}
      </Link>
      <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-900 cursor-pointer">
        {t("nav.logout")}
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="px-4 py-2 rounded-full text-brand-700 font-semibold hover:bg-brand-50">
        {t("nav.login")}
      </Link>
      <Link to="/register" className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-sm">
        {t("nav.register")}
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      {/* Top info bar */}
      <div className="bg-brand-700 text-brand-50 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
          <span className="hidden md:flex items-center gap-2">
            <Icon name="clock" className="w-4 h-4" /> {t("hours.weekdays")} {site.hours.weekdays}
          </span>
          <span className="flex items-center gap-5">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
              <Icon name="phone" className="w-4 h-4" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hidden sm:flex items-center gap-2 hover:text-white">
              <Icon name="mail" className="w-4 h-4" /> {site.email}
            </a>
            <LanguageSwitch />
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo />

        <div className="hidden xl:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              to={{ pathname: "/", hash: l.hash }}
              className="px-3 py-2 rounded-full text-slate-700 font-medium hover:text-brand-700 hover:bg-brand-50"
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2">{authButtons}</div>

        <button
          className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={t("nav.menu")}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t border-slate-100 px-6 py-4 flex flex-col gap-1" onClick={() => setOpen(false)}>
          {LINKS.map((l) => (
            <Link key={l.key} to={{ pathname: "/", hash: l.hash }} className="px-3 py-2 rounded-lg text-slate-700 hover:bg-brand-50">
              {t(`nav.${l.key}`)}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">{authButtons}</div>
        </div>
      )}
    </header>
  );
}
