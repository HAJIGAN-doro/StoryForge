import { useCallback } from 'react';
import { useChatStore } from '@/stores';
import type { ChatMessage } from '@/types';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  loadConversation: () => Promise<void>;
  generateStory: () => Promise<string>;
  clearMessages: () => void;
}

export function useChat(storyId: string): UseChatReturn {
  const {
    messages,
    isLoading,
    isGenerating,
    error,
    sendMessage: storeSendMessage,
    loadConversation: storeLoadConversation,
    generateStory: storeGenerateStory,
    clearMessages,
  } = useChatStore();

  const sendMessage = useCallback(
    async (content: string) => {
      await storeSendMessage(storyId, content);
    },
    [storyId, storeSendMessage]
  );

  const loadConversation = useCallback(async () => {
    await storeLoadConversation(storyId);
  }, [storyId, storeLoadConversation]);

  const generateStory = useCallback(async () => {
    return await storeGenerateStory(storyId);
  }, [storyId, storeGenerateStory]);

  return {
    messages,
    isLoading,
    isGenerating,
    error,
    sendMessage,
    loadConversation,
    generateStory,
    clearMessages,
  };
}
