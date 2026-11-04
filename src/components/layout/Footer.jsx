import { Link } from "react-router-dom";
import site from "../../config/site";
import Logo from "./Logo";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{site.tagline}.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={{ pathname: "/", hash: "#departments" }} className="hover:text-teal-300">Departments</Link></li>
            <li><Link to={{ pathname: "/", hash: "#doctors" }} className="hover:text-teal-300">Our Doctors</Link></li>
            <li><Link to="/login" className="hover:text-teal-300">Patient Login</Link></li>
            <li><Link to="/register" className="hover:text-teal-300">Create an Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Opening Hours</h4>
          <ul className="space-y-2 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-slate-400">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Icon name="pin" className="w-5 h-5 shrink-0 text-teal-400" />{site.address}</li>
            <li className="flex gap-2"><Icon name="phone" className="w-5 h-5 shrink-0 text-teal-400" />{site.phone}</li>
            <li className="flex gap-2"><Icon name="mail" className="w-5 h-5 shrink-0 text-teal-400" />{site.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="max-w-7xl mx-auto px-6 py-5 text-sm text-slate-500">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
