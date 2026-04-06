import { useEffect } from 'react';
import { useSettingsStore } from '@/stores';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#1A1A1A';
      document.body.style.color = '#E5E5E5';
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#F5F5F5';
      document.body.style.color = '#333333';
    }
  }, [theme]);

  return <>{children}</>;
};
