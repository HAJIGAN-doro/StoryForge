import api from './api';
import type { ChatMessage, SendMessageRequest, SendMessageResponse } from '@/types';

export const chatService = {
  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await api.post(`/chat/message/${data.storyId}`, { content: data.content });
    return response.data;
  },

  async getConversation(storyId: string): Promise<ChatMessage[]> {
    const response = await api.get(`/chat/conversation/${storyId}`);
    return response.data;
  },

  async generateStory(storyId: string): Promise<{ content: string }> {
    const response = await api.post(`/chat/generate/${storyId}`);
    return response.data;
  },
};
