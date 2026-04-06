import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '@/types';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-background-light dark:bg-background-dark transition-colors duration-300">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <span className="text-6xl mb-4">📚</span>
          <h3 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark mb-2">{t('chat.startJourney')}</h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-sm">
            {t('chat.startJourneyDesc')}
          </p>
        </div>
      )}

      {messages.map((message) => (
        <ChatMessageComponent key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-card p-4 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
