import axios from 'axios';
import { config } from '../config/index.js';

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `你是一个专业的人生故事记录AI助手。你的任务是：
1. 通过温和、引导性的问题帮助用户回忆和讲述他们的人生故事
2. 使用开放式问题深入挖掘故事的细节和情感
3. 保持对话的自然流畅，让用户感到舒适和被理解
4. 适时地总结和确认用户讲述的内容
5. 鼓励用户分享更多细节，但不要过于追问敏感话题

请用友好、温暖的语气与用户交流。`;

export const aiService = {
  async chat(messages: AIMessage[]): Promise<string> {
    const allMessages: AIMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    if (config.ai.provider === 'deepseek' || config.ai.provider === 'openai') {
      return this.chatWithOpenAICompatible(allMessages);
    } else if (config.ai.provider === 'ollama') {
      return this.chatWithOllama(allMessages);
    } else if (config.ai.provider === 'lmstudio') {
      return this.chatWithLMStudio(allMessages);
    }

    throw new Error('Unsupported AI provider');
  },

  async chatWithOpenAICompatible(messages: AIMessage[]): Promise<string> {
    const response = await axios.post(
      `${config.ai.apiEndpoint}/chat/completions`,
      {
        model: config.ai.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.ai.apiKey}`,
        },
      }
    );

    return response.data.choices[0]?.message?.content || '';
  },

  async chatWithOllama(messages: AIMessage[]): Promise<string> {
    const response = await axios.post(
      `${config.ai.ollama.apiUrl}/api/chat`,
      {
        model: config.ai.ollama.model,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        stream: false,
      }
    );

    return response.data.message?.content || '';
  },

  async chatWithLMStudio(messages: AIMessage[]): Promise<string> {
    const response = await axios.post(
      `${config.ai.lmstudio.apiUrl}/v1/chat/completions`,
      {
        model: config.ai.lmstudio.model || 'local-model',
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        temperature: 0.7,
        max_tokens: 2000,
      }
    );

    return response.data.choices[0]?.message?.content || '';
  },

  async generateStory(conversationText: string): Promise<string> {
    const prompt = `
请根据以下对话内容，写一篇完整的人生故事。

要求：
1. 使用第一人称"我"来叙述
2. 故事要有开头、经过和结尾
3. 适当分段，使用Markdown格式
4. 语言温暖、流畅，能够打动读者
5. 可以适当添加一些情感描写

对话内容：
${conversationText}

请直接输出故事内容，不需要其他说明。
`;

    return this.chat([{ role: 'user', content: prompt }]);
  },
};
