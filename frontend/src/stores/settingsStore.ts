import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AIConfig, AIProvider } from '@/types';

interface SettingsState {
  aiConfig: AIConfig;
  theme: 'light' | 'dark';
  language: string;
  updateAIConfig: (config: Partial<AIConfig>) => void;
  setProvider: (provider: AIProvider) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      aiConfig: {
        provider: 'openai',
        apiKey: '',
        apiUrl: '',
        model: 'gpt-3.5-turbo',
      },
      theme: 'light',
      language: 'zh-CN',

      updateAIConfig: (config) =>
        set((state) => ({
          aiConfig: { ...state.aiConfig, ...config },
        })),

      setProvider: (provider) =>
        set((state) => ({
          aiConfig: { ...state.aiConfig, provider },
        })),

      setTheme: (theme) => set({ theme }),

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'apstory-settings',
    }
  )
);
