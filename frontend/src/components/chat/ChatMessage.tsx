import React from 'react';
import type { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-card p-4 ${
          isUser
            ? 'bg-primary text-white'
            : 'bg-surface border border-border text-text-primary'
        }`}
      >
        <div className="flex items-start gap-2">
          {!isUser && (
            <span className="text-lg" role="img" aria-label="AI">
              🤖
            </span>
          )}
          <div className="flex-1">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          {isUser && (
            <span className="text-lg" role="img" aria-label="User">
              👤
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
