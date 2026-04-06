import { Request, Response, NextFunction } from 'express';
import { storyService } from '../services/index.js';

export const storyController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = storyService.getAllStories();
      res.json(stories);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const story = storyService.getStory(id);
      res.json(story);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const story = storyService.createStory(title);
      res.status(201).json(story);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const story = storyService.updateStory(id, title, content);
      res.json(story);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await storyService.deleteStory(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async export(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { format = 'md' } = req.query;
      const buffer = storyService.exportStory(id, format as 'txt' | 'md');
      res.setHeader('Content-Type', format === 'txt' ? 'text/plain' : 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="story-${id}.${format}"`);
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  },
};
