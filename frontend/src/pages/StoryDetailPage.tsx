import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Container, PageHeader } from '@/components/layout';
import { Button } from '@/components/common';
import { StoryEditor } from '@/components/story';
import { useStory } from '@/hooks';
import { formatDateTime } from '@/utils';

export const StoryDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentStory, fetchStory, updateStory, deleteStory, exportStory } = useStory();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStory(id);
    }
  }, [id, fetchStory]);

  const handleSave = async (title: string, content: string) => {
    if (id) {
      await updateStory(id, title, content);
      setIsEditing(false);
    }
  };

  const handleExport = async (format: 'txt' | 'md') => {
    if (id) {
      await exportStory(id, format);
    }
  };

  const handleDelete = async () => {
    if (id) {
      await deleteStory(id);
      navigate('/stories');
    }
  };

  if (!currentStory) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('common.loading')}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Link to="/stories" className="text-secondary hover:text-secondary-dark">
          ← {t('storyDetail.backToList')}
        </Link>
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                {t('storyDetail.edit')}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('md')}>
                {t('storyDetail.exportMd')}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('txt')}>
                {t('storyDetail.exportTxt')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-error hover:text-red-700"
              >
                {t('storyDetail.delete')}
              </Button>
            </>
          )}
        </div>
      </div>

      <PageHeader
        title={currentStory.title || t('stories.noStories')}
        subtitle={`${t('storyDetail.createdAt')} ${formatDateTime(currentStory.createdAt)}`}
      />

      {isEditing ? (
        <StoryEditor
          initialTitle={currentStory.title}
          initialContent={currentStory.content}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="bg-surface-light dark:bg-surface-dark rounded-card shadow-card p-6 transition-colors duration-300">
          {currentStory.content ? (
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown>{currentStory.content}</ReactMarkdown>
            </article>
          ) : (
            <p className="text-text-secondary-light dark:text-text-secondary-dark italic">
              {t('storyDetail.emptyContent')}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface-light dark:bg-surface-dark rounded-card shadow-card transition-colors duration-300">
        <h3 className="font-medium text-text-primary-light dark:text-text-primary-dark mb-2">{t('storyDetail.continueStory')}</h3>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
          {t('storyDetail.continueStoryDesc')}
        </p>
        <Link to={`/chat/${id}`}>
          <Button variant="secondary">{t('storyDetail.continueChat')}</Button>
        </Link>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-surface-light dark:bg-surface-dark rounded-card shadow-card p-6 max-w-sm w-full mx-4 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">{t('storyDetail.confirmDelete')}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              {t('storyDetail.confirmDeleteDesc')}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                {t('storyDetail.cancel')}
              </Button>
              <Button onClick={handleDelete} className="bg-error hover:bg-red-700">
                {t('storyDetail.delete')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
