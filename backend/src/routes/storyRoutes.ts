import { Router } from 'express';
import { storyController } from '../controllers/index.js';

const router = Router();

router.get('/', storyController.getAll);
router.get('/:id', storyController.getById);
router.post('/', storyController.create);
router.put('/:id', storyController.update);
router.delete('/:id', storyController.delete);
router.get('/:id/export', storyController.export);

export default router;
