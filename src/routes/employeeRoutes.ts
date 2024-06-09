import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';

const router = Router();

router.get('/', EmployeeController.getAll);
router.get('/info/:id', EmployeeController.getById);
router.post('/create/', EmployeeController.create);
router.put('/update/:id', EmployeeController.update);
router.delete('/delete/:id', EmployeeController.delete);

export default router;
