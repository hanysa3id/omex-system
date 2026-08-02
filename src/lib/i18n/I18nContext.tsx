'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

type Language = 'en' | 'ar';

interface I18nContextType {
  lang: Language;
  t: typeof translations['en'];
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('omex_lang') as Language;
    if (saved === 'en' || saved === 'ar') {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('omex_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <I18nContext.Provider
      value={{
        lang,
        t: translations[lang],
        toggleLanguage,
        setLanguage,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
