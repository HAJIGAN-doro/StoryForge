import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  ai: {
    provider: (process.env.AI_PROVIDER || 'deepseek') as 'openai' | 'ollama' | 'lmstudio' | 'deepseek',
    apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || '',
    apiEndpoint: process.env.DEEPSEEK_API_ENDPOINT || process.env.OPENAI_API_ENDPOINT || 'https://api.deepseek.com/v1',
    model: process.env.DEEPSEEK_MODEL || process.env.OPENAI_MODEL || 'deepseek-chat',
    ollama: {
      apiUrl: process.env.OLLAMA_API_URL || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama2',
    },
    lmstudio: {
      apiUrl: process.env.LMSTUDIO_API_URL || 'http://localhost:1234',
      model: process.env.LMSTUDIO_MODEL || '',
    },
  },

  database: {
    path: process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'stories.db'),
  },
};
