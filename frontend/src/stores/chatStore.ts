import { create } from 'zustand';
import type { ChatMessage } from '@/types';
import { chatService } from '@/services';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;
  currentStoryId: string | null;
  sendMessage: (storyId: string, content: string) => Promise<void>;
  loadConversation: (storyId: string) => Promise<void>;
  generateStory: (storyId: string) => Promise<string>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  isGenerating: false,
  error: null,
  currentStoryId: null,

  sendMessage: async (storyId: string, content: string) => {
    set({ isLoading: true, error: null, currentStoryId: storyId });
    try {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({ messages: [...state.messages, userMessage] }));

      const response = await chatService.sendMessage({ storyId, content });
      set((state) => ({
        messages: [...state.messages, response.message],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to send message', isLoading: false });
    }
  },

  loadConversation: async (storyId: string) => {
    set({ isLoading: true, error: null, currentStoryId: storyId });
    try {
      const messages = await chatService.getConversation(storyId);
      set({ messages, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load conversation', isLoading: false });
    }
  },

  generateStory: async (storyId: string) => {
    set({ isGenerating: true, error: null });
    try {
      const response = await chatService.generateStory(storyId);
      set({ isGenerating: false });
      return response.content;
    } catch (error) {
      set({ error: 'Failed to generate story', isGenerating: false });
      throw error;
    }
  },

  clearMessages: () => {
    set({ messages: [], currentStoryId: null });
  },
}));
