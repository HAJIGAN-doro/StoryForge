import React from 'react';
import { useTranslation } from 'react-i18next';
import { StoryCard } from './StoryCard';
import type { StoryListItem } from '@/types';

interface StoryListProps {
  stories: StoryListItem[];
  onDelete?: (id: string) => void;
}

export const StoryList: React.FC<StoryListProps> = ({ stories, onDelete }) => {
  const { t } = useTranslation();

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('stories.noStoriesYet')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} onDelete={onDelete} />
      ))}
    </div>
  );
};
