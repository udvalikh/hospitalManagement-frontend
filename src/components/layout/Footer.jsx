import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import site, { openingHours } from "../../config/site";
import Logo from "./Logo";
import Icon from "./Icon";

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-brand-200">{t("brand.tagline")}.</p>
          {site.facebook && (
            <a href={site.facebook} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm hover:text-white">
              <Icon name="globe" className="w-5 h-5" /> Facebook
            </a>
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.links")}</h4>
          <ul className="space-y-2 text-sm">
            {["services", "doctors", "advice", "about"].map((k) => (
              <li key={k}>
                <Link to={{ pathname: "/", hash: `#${k}` }} className="hover:text-white">{t(`nav.${k}`)}</Link>
              </li>
            ))}
            <li><Link to="/login" className="hover:text-white">{t("nav.login")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.hours")}</h4>
          <ul className="space-y-2 text-sm">
            {openingHours(t).map((h) => (
              <li key={h.label} className="flex justify-between gap-4">
                <span>{h.label}</span>
                <span className="text-brand-200">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Icon name="pin" className="w-5 h-5 shrink-0 text-red-400" />{site.address[lang]}</li>
            <li className="flex gap-2"><Icon name="phone" className="w-5 h-5 shrink-0 text-red-400" />{site.phone}</li>
            <li className="flex gap-2"><Icon name="mail" className="w-5 h-5 shrink-0 text-red-400" />{site.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <p className="max-w-7xl mx-auto px-6 py-5 text-sm text-brand-300">
          © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
