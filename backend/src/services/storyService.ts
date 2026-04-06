import { storyModel } from '../models/index.js';

export const storyService = {
  getAllStories() {
    return storyModel.getAll();
  },

  getStory(id: string) {
    const story = storyModel.getById(id);
    if (!story) {
      throw new Error('Story not found');
    }
    return story;
  },

  createStory(title?: string) {
    return storyModel.create(title);
  },

  updateStory(id: string, title: string, content: string) {
    const story = storyModel.update(id, title, content);
    if (!story) {
      throw new Error('Story not found');
    }
    return story;
  },

  deleteStory(id: string) {
    const success = storyModel.delete(id);
    if (!success) {
      throw new Error('Story not found');
    }
    return { success: true };
  },

  exportStory(id: string, format: 'txt' | 'md') {
    const story = this.getStory(id);

    if (format === 'txt') {
      const content = `${story.title}\n\n${story.content}`;
      return Buffer.from(content, 'utf-8');
    } else {
      const content = `# ${story.title}\n\n${story.content}`;
      return Buffer.from(content, 'utf-8');
    }
  },
};
