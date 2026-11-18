import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ar from '../../i18n/ar';
import en from '../../i18n/en';

const DICTIONARIES = { ar, en };
const DEFAULT_LANG = 'ar';
const LanguageContext = createContext(null);

const read = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || DEFAULT_LANG);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = useCallback((path) => read(DICTIONARIES[lang], path) ?? path, [lang]);
  const toggleLang = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), []);
  const value = useMemo(() => ({ lang, t, toggleLang }), [lang, t, toggleLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
