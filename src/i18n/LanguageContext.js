import { createContext, useContext } from "react";

// { lang: "mn" | "en", setLang, t(key, vars), locale }
export const LanguageContext = createContext(null);

export const useLang = () => useContext(LanguageContext);
