import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/stores';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const language = useSettingsStore((state) => state.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return <>{children}</>;
};
