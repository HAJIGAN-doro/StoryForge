import { useSettingsStore } from '@/stores';
import type { AIConfig, AIProvider } from '@/types';

interface UseSettingsReturn {
  aiConfig: AIConfig;
  theme: 'light' | 'dark';
  language: string;
  updateAIConfig: (config: Partial<AIConfig>) => void;
  setProvider: (provider: AIProvider) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

export function useSettings(): UseSettingsReturn {
  const {
    aiConfig,
    theme,
    language,
    updateAIConfig,
    setProvider,
    setTheme,
    setLanguage,
  } = useSettingsStore();

  return {
    aiConfig,
    theme,
    language,
    updateAIConfig,
    setProvider,
    setTheme,
    setLanguage,
  };
}
