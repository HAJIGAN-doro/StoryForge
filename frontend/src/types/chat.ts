export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  storyId: string;
  messages: ChatMessage[];
}

export interface SendMessageRequest {
  storyId: string;
  content: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
}
