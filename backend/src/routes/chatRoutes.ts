import { Router } from 'express';
import { chatController } from '../controllers/index.js';

const router = Router();

router.get('/conversation/:storyId', chatController.getConversation);
router.post('/message/:storyId', chatController.sendMessage);
router.post('/generate/:storyId', chatController.generateStory);

export default router;
