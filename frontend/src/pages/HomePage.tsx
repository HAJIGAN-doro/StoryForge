import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, PageHeader } from '@/components/layout';
import { Button } from '@/components/common';
import { StoryList } from '@/components/story';
import { useStory } from '@/hooks';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { stories, fetchStories, createStory, deleteStory } = useStory();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleCreateStory = async () => {
    await createStory();
  };

  const handleDeleteStory = async (id: string) => {
    if (window.confirm(t('home.confirmDelete'))) {
      await deleteStory(id);
    }
  };

  const recommendedTopics = [
    { title: t('home.topicChildhood'), desc: t('home.topicChildhoodDesc') },
    { title: t('home.topicEducation'), desc: t('home.topicEducationDesc') },
    { title: t('home.topicCareer'), desc: t('home.topicCareerDesc') },
  ];

  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title={t('home.title')}
          subtitle={t('home.subtitle')}
        />
        <Button onClick={handleCreateStory}>
          {t('home.startWriting')}
        </Button>
      </div>

      <StoryList stories={stories} onDelete={handleDeleteStory} />

      <div className="mt-12 p-6 bg-surface-light dark:bg-surface-dark rounded-card shadow-card transition-colors duration-300">
        <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">{t('home.recommendedTopics')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedTopics.map((topic) => (
            <Link
              key={topic.title}
              to={`/chat/new?topic=${encodeURIComponent(topic.title)}`}
              className="p-4 border border-border-light dark:border-border-dark rounded-card hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all"
            >
              <h3 className="font-medium text-text-primary-light dark:text-text-primary-dark">{topic.title}</h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{topic.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};
