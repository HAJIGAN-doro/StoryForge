export type AIProvider = 'openai' | 'ollama' | 'lmstudio';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  apiUrl?: string;
  model?: string;
}

export interface Settings {
  aiConfig: AIConfig;
  dataPath: string;
  theme: 'light' | 'dark';
  language: string;
}

export interface UpdateAIConfigRequest {
  provider: AIProvider;
  apiKey?: string;
  apiUrl?: string;
  model?: string;
}
