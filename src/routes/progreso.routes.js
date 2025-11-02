import {Router} from 'express';
import {postRegistraProgreso, getProgresoByUser} from '../controllers/progresoController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();
router.post('/progreso/:id', verifyToken, postRegistraProgreso);
router.get('/progreso/:id', verifyToken, getProgresoByUser);

//estaditica habito????? en API O BASE DE DATOS


/*
{
    "fecha": "2025-10-29",
    "completado": 1
}
*/

export default router;
