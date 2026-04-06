import { create } from 'zustand';
import type { Story, StoryListItem } from '@/types';
import { storyService } from '@/services';

interface StoryState {
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

export const useStoryStore = create<StoryState>((set) => ({
  stories: [],
  currentStory: null,
  isLoading: false,
  error: null,

  fetchStories: async () => {
    set({ isLoading: true, error: null });
    try {
      const stories = await storyService.getStories();
      set({ stories, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch stories', isLoading: false });
    }
  },

  fetchStory: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const story = await storyService.getStory(id);
      set({ currentStory: story, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch story', isLoading: false });
    }
  },

  createStory: async (title?: string) => {
    set({ isLoading: true, error: null });
    try {
      const story = await storyService.createStory({ title });
      set((state) => ({
        stories: [story, ...state.stories],
        currentStory: story,
        isLoading: false,
      }));
      return story;
    } catch (error) {
      set({ error: 'Failed to create story', isLoading: false });
      throw error;
    }
  },

  updateStory: async (id: string, title: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const story = await storyService.updateStory(id, { title, content });
      set((state) => ({
        currentStory: story,
        stories: state.stories.map((s) => (s.id === id ? story : s)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update story', isLoading: false });
      throw error;
    }
  },

  deleteStory: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await storyService.deleteStory(id);
      set((state) => ({
        stories: state.stories.filter((s) => s.id !== id),
        currentStory: state.currentStory?.id === id ? null : state.currentStory,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete story', isLoading: false });
      throw error;
    }
  },

  exportStory: async (id: string, format: 'txt' | 'md') => {
    const blob = await storyService.exportStory(id, format);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `story-${id}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));
