import { Request, Response, NextFunction } from 'express';
import { chatService } from '../services/index.js';

export const chatController = {
  async getConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { storyId } = req.params;
      const messages = chatService.getConversation(storyId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  },

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { storyId } = req.params;
      const { content } = req.body;

      if (!content) {
        res.status(400).json({ error: 'Message content is required' });
        return;
      }

      const message = await chatService.sendMessage(storyId, content);
      res.json({ message });
    } catch (error) {
      next(error);
    }
  },

  async generateStory(req: Request, res: Response, next: NextFunction) {
    try {
      const { storyId } = req.params;
      const result = await chatService.generateStory(storyId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
