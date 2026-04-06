import api from './api';
import type { Story, StoryListItem, CreateStoryRequest, UpdateStoryRequest } from '@/types';

export const storyService = {
  async getStories(): Promise<StoryListItem[]> {
    const response = await api.get('/stories');
    return response.data;
  },

  async getStory(id: string): Promise<Story> {
    const response = await api.get(`/stories/${id}`);
    return response.data;
  },

  async createStory(data: CreateStoryRequest): Promise<Story> {
    const response = await api.post('/stories', data);
    return response.data;
  },

  async updateStory(id: string, data: UpdateStoryRequest): Promise<Story> {
    const response = await api.put(`/stories/${id}`, data);
    return response.data;
  },

  async deleteStory(id: string): Promise<void> {
    await api.delete(`/stories/${id}`);
  },

  async exportStory(id: string, format: 'txt' | 'md'): Promise<Blob> {
    const response = await api.get(`/stories/${id}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
};
