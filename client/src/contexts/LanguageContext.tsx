import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "he";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  isHe: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "he",
  setLang: () => {},
  isHe: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");
  return (
    <LanguageContext.Provider value={{ lang, setLang, isHe: lang === "he" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
