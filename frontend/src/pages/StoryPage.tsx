import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, PageHeader } from '@/components/layout';
import { Button } from '@/components/common';
import { StoryList } from '@/components/story';
import { useStory } from '@/hooks';

export const StoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { stories, fetchStories, deleteStory } = useStory();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleDeleteStory = async (id: string) => {
    if (window.confirm(t('storyDetail.confirmDeleteDesc'))) {
      await deleteStory(id);
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title={t('stories.title')}
          subtitle={t('stories.subtitle')}
        />
        <Link to="/">
          <Button>{t('stories.backToHome')}</Button>
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-card transition-colors duration-300">
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">{t('stories.noStories')}</p>
          <Link to="/">
            <Button>{t('stories.startFirstStory')}</Button>
          </Link>
        </div>
      ) : (
        <StoryList stories={stories} onDelete={handleDeleteStory} />
      )}
    </Container>
  );
};
