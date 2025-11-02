//esto creo que no, solo serian notificaciones del telefono mismo, seria en la aplicacion movil

import {Router} from 'express';
import {} from '../controllers/alertasController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/rutina/:id', verifyToken, getRutinaByUser); //alertas por usuario

export default router;
