import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import site from "../../config/site";
import Logo from "./Logo";
import Icon from "./Icon";

// Section links point at anchors on the home page; HomePage scrolls to the hash.
const LINKS = [
  { label: "Home", hash: "" },
  { label: "Departments", hash: "#departments" },
  { label: "Doctors", hash: "#doctors" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const authButtons = session ? (
    <>
      <Link to="/dashboard" className="px-4 py-2 rounded-lg text-teal-700 font-medium hover:bg-teal-50">
        Dashboard
      </Link>
      <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-900 cursor-pointer">
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="px-4 py-2 rounded-lg text-teal-700 font-medium hover:bg-teal-50">
        Login
      </Link>
      <Link to="/register" className="px-4 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700">
        Register
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      {/* Top info bar */}
      <div className="hidden md:block bg-teal-700 text-teal-50 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <span className="flex items-center gap-2">
            <Icon name="clock" className="w-4 h-4" /> Mon - Fri {site.hours[0].time} · Emergency 24/7
          </span>
          <span className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Icon name="phone" className="w-4 h-4" /> {site.phone}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="mail" className="w-4 h-4" /> {site.email}
            </span>
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={{ pathname: "/", hash: l.hash }}
              className="px-3 py-2 rounded-lg text-slate-700 font-medium hover:text-teal-700 hover:bg-teal-50"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">{authButtons}</div>

        <button
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 px-6 py-4 flex flex-col gap-1" onClick={() => setOpen(false)}>
          {LINKS.map((l) => (
            <Link key={l.label} to={{ pathname: "/", hash: l.hash }} className="px-3 py-2 rounded-lg text-slate-700 hover:bg-teal-50">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">{authButtons}</div>
        </div>
      )}
    </header>
  );
}
