import { useEffect, useState } from "react";
import translations from "./translations";
import { LanguageContext } from "./LanguageContext";

const LOCALES = { mn: "mn-MN", en: "en-US" };

const lookup = (lang, key) => key.split(".").reduce((obj, part) => obj?.[part], translations[lang]);

export default function LanguageProvider({ children }) {
  // Mongolian by default; the choice is remembered in localStorage.
  const [lang, setLangState] = useState(() => (localStorage.getItem("lang") === "en" ? "en" : "mn"));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].brand.name;
  }, [lang]);

  const setLang = (next) => {
    localStorage.setItem("lang", next);
    setLangState(next);
  };

  // t("home.book") -> text in the current language (falls back to English, then the key itself).
  const t = (key, vars) => {
    let value = lookup(lang, key) ?? lookup("en", key) ?? key;
    if (typeof value === "string" && vars) {
      value = value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, locale: LOCALES[lang] }}>{children}</LanguageContext.Provider>
  );
}
