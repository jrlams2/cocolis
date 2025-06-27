import { useState, useCallback } from 'react';
import { translations, TranslationKey } from '../i18n/translations';
import type { Language } from '../types';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('fr');

  const t = useCallback((key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || defaultValue || key;
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return {
    t,
    language,
    changeLanguage
  };
}