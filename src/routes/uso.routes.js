import {Router} from 'express';
import {getUsosByUser, postUsoApp} from '../controllers/usoController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/usoAplicaion/:id', verifyToken, getUsosByUser);
router.post('/usoAplicaion/:id', verifyToken, postUsoApp);

export default router;