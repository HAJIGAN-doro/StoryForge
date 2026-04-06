import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChatWindow, ChatInput } from '@/components/chat';
import { Button, Modal } from '@/components/common';
import { useChat, useStory } from '@/hooks';
import { chatService } from '@/services';

export const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const { storyId } = useParams<{ storyId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);

  const { createStory } = useStory();
  const { messages, isLoading, isGenerating, loadConversation, generateStory, clearMessages } = useChat(currentStoryId || '');

  useEffect(() => {
    if (storyId && storyId !== 'new') {
      setCurrentStoryId(storyId);
      loadConversation();
    } else {
      setCurrentStoryId(null);
      clearMessages();
    }
  }, [storyId]);

  const handleSendMessage = async (content: string) => {
    let sid = currentStoryId;

    if (!sid || sid === 'new') {
      const newStory = await createStory();
      sid = newStory.id;
      setCurrentStoryId(sid);
      navigate(`/chat/${sid}`, { replace: true });
    }

    if (sid) {
      await chatService.sendMessage({ storyId: sid, content });
      await loadConversation();
    }
  };

  const handleEndConversation = async () => {
    if (!currentStoryId || currentStoryId === 'new') return;
    try {
      await generateStory();
      setShowEndDialog(true);
    } catch (error) {
      console.error('Failed to generate story:', error);
    }
  };

  const handleCloseDialog = () => {
    setShowEndDialog(false);
    navigate(`/stories/${currentStoryId}`);
  };

  const topic = searchParams.get('topic');

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
            {topic ? `${t('chat.topic')}: ${topic}` : t('chat.title')}
          </h1>
          {currentStoryId && currentStoryId !== 'new' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEndConversation}
              isLoading={isGenerating}
            >
              {t('chat.endConversation')}
            </Button>
          )}
        </div>
      </div>

      <ChatWindow messages={messages} isLoading={isLoading} />

      <ChatInput
        onSend={handleSendMessage}
        isLoading={isLoading}
        disabled={isGenerating}
      />

      <Modal
        isOpen={showEndDialog}
        onClose={handleCloseDialog}
        title={t('chat.storyGenerated')}
      >
        <div className="space-y-4">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            {t('chat.storyGeneratedDesc')}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowEndDialog(false)}>
              {t('chat.keepChatting')}
            </Button>
            <Button onClick={handleCloseDialog}>
              {t('chat.viewStory')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
