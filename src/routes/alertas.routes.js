//esto creo que no, solo serian notificaciones del telefono mismo, seria en la aplicacion movil

import {Router} from 'express';
import {getAlertaByUser, postCreateAlerta, deleteAlerta} from '../controllers/alertasController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/alerta/:id', verifyToken, getAlertaByUser); //alertas por usuario
router.post('/alerta/:id', verifyToken, postCreateAlerta); //crea alerta
router.delete('/alerta/:id', verifyToken, deleteAlerta); //delete alerta

//marcar alerta leida????????

export default router;
