import { Router } from 'express';
import studentRoutes from '../controllers/StudentController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', studentRoutes.index);
router.post('/', loginRequired, studentRoutes.store);
router.put('/:id', loginRequired, studentRoutes.update);
router.get('/:id', studentRoutes.show);
router.delete('/:id', loginRequired, studentRoutes.delete);

export default router;
