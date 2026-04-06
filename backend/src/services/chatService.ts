import { conversationModel, storyModel } from '../models/index.js';
import { aiService } from './aiService.js';

export const chatService = {
  getConversation(storyId: string) {
    const story = storyModel.getById(storyId);
    if (!story) {
      throw new Error('Story not found');
    }
    return conversationModel.getByStoryId(storyId);
  },

  async sendMessage(storyId: string, content: string) {
    const story = storyModel.getById(storyId);
    if (!story) {
      throw new Error('Story not found');
    }

    conversationModel.create(storyId, 'user', content);

    const conversations = conversationModel.getByStoryId(storyId);
    const messages = conversations.map(c => ({
      role: c.role as 'user' | 'assistant',
      content: c.content,
    }));

    const aiResponse = await aiService.chat(messages);

    const assistantMessage = conversationModel.create(storyId, 'assistant', aiResponse);

    return assistantMessage;
  },

  async generateStory(storyId: string) {
    const story = storyModel.getById(storyId);
    if (!story) {
      throw new Error('Story not found');
    }

    const conversations = conversationModel.getByStoryId(storyId);
    const conversationText = conversations
      .map(c => `${c.role === 'user' ? '用户' : 'AI'}: ${c.content}`)
      .join('\n');

    const generatedContent = await aiService.generateStory(conversationText);

    storyModel.update(storyId, story.title, generatedContent);

    return { content: generatedContent };
  },
};
