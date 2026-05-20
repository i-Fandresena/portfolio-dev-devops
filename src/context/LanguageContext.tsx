import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: string | Translations;
}

interface TranslationsData {
  fr: Translations;
  en: Translations;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode; translations: TranslationsData }> = ({
  children,
  translations,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage or default to 'fr'
    const saved = localStorage.getItem('language') as Language;
    return saved === 'en' || saved === 'fr' ? saved : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];

    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof current === 'string' ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
