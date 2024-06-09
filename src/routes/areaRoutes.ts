import { Router } from 'express';
import { AreaController } from '../controllers/AreaController';

const router = Router();

router.get('/', AreaController.getAll);
router.get('/info/:id', AreaController.getById);
router.post('/crear/', AreaController.create);
router.put('/update/:id', AreaController.update);
router.delete('/delete/:id', AreaController.delete);

export default router;
