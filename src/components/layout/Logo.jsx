import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

// Clinic logo (public/logo.jpg) with the name next to it.
export default function Logo({ light = false }) {
  const { t } = useLang();
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/logo.jpg"
        alt={t("brand.name")}
        className="w-12 h-12 rounded-full bg-white object-cover ring-1 ring-brand-100"
      />
      <span className="leading-tight">
        <span className={`block text-lg font-extrabold ${light ? "text-white" : "text-brand-800"}`}>{t("brand.short")}</span>
        <span className={`block text-xs font-semibold tracking-wider uppercase ${light ? "text-brand-200" : "text-red-600"}`}>
          {t("brand.sub")}
        </span>
      </span>
    </Link>
  );
}
