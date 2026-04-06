import { useCallback } from 'react';
import { useStoryStore } from '@/stores';
import type { Story, StoryListItem } from '@/types';

interface UseStoryReturn {
  stories: StoryListItem[];
  currentStory: Story | null;
  isLoading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
  fetchStory: (id: string) => Promise<void>;
  createStory: (title?: string) => Promise<Story>;
  updateStory: (id: string, title: string, content: string) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  exportStory: (id: string, format: 'txt' | 'md') => Promise<void>;
}

export function useStory(): UseStoryReturn {
  const {
    stories,
    currentStory,
    isLoading,
    error,
    fetchStories,
    fetchStory,
    createStory,
    updateStory,
    deleteStory,
    exportStory,
  } = useStoryStore();

  return {
    stories,
    currentStory,
    isLoading,
    error,
    fetchStories,
    fetchStory: useCallback(
      (id: string) => fetchStory(id),
      [fetchStory]
    ),
    createStory: useCallback(
      (title?: string) => createStory(title),
      [createStory]
    ),
    updateStory: useCallback(
      (id: string, title: string, content: string) => updateStory(id, title, content),
      [updateStory]
    ),
    deleteStory: useCallback(
      (id: string) => deleteStory(id),
      [deleteStory]
    ),
    exportStory: useCallback(
      (id: string, format: 'txt' | 'md') => exportStory(id, format),
      [exportStory]
    ),
  };
}
