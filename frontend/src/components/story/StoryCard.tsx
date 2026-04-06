import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { StoryListItem } from '@/types';
import { formatRelativeTime } from '@/utils';

interface StoryCardProps {
  story: StoryListItem;
  onDelete?: (id: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-card shadow-card p-4 hover:shadow-md transition-shadow transition-colors duration-300">
      <Link to={`/stories/${story.id}`} className="block">
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark truncate">{story.title || t('stories.untitled')}</h3>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
          {t('stories.createdAt')} {formatRelativeTime(story.createdAt)}
        </p>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {t('stories.updatedAt')} {formatRelativeTime(story.updatedAt)}
        </p>
      </Link>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-light dark:border-border-dark">
        <Link
          to={`/chat/${story.id}`}
          className="text-sm text-primary hover:text-primary-dark"
        >
          {t('stories.continueChat')}
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(story.id)}
            className="text-sm text-error hover:text-red-700 ml-auto"
          >
            {t('common.delete')}
          </button>
        )}
      </div>
    </div>
  );
};
