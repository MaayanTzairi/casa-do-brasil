import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "he";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  isHe: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  isHe: false,
});

const STORAGE_KEY = "cdb_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "he") return stored;
    } catch {}
    return "en";
  });

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    setLangState(l);
  };

  // Apply dir attribute to <html> so all browser defaults follow RTL
  useEffect(() => {
    document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang === "he" ? "he" : "en");
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isHe: lang === "he" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
