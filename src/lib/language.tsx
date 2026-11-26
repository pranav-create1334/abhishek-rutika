import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Bilingual, Language } from '../content';

type LanguageContextValue = {
  lang: Language;
  otherLang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** The active-language string. */
  t: (value: Bilingual) => string;
  /** The other language's string, for the secondary line. */
  tOther: (value: Bilingual) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('mr');

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === 'mr' ? 'en' : 'mr'));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const otherLang: Language = lang === 'mr' ? 'en' : 'mr';
    return {
      lang,
      otherLang,
      setLang,
      toggleLang,
      t: (copy) => copy[lang],
      tOther: (copy) => copy[otherLang],
    };
  }, [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useLanguage must be used inside <LanguageProvider>.');
  }
  return value;
}
