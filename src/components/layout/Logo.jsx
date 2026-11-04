import { Link } from "react-router-dom";
import site from "../../config/site";

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="w-9 h-9" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0d9488" />
        <path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill="#fff" />
      </svg>
      <span className="leading-tight">
        <span className={`block text-lg font-bold ${light ? "text-white" : "text-slate-900"}`}>{site.shortName}</span>
        <span className={`block text-xs font-medium tracking-widest uppercase ${light ? "text-teal-200" : "text-teal-600"}`}>
          Hospital
        </span>
      </span>
    </Link>
  );
}
