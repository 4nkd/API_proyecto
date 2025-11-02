import {Router} from 'express';
import {getUsers, getUsersByID, putUsuario, deleteUsuario} from '../controllers/usuariosController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/usuario', verifyToken, getUsers); //todos los usuarios
router.get('/usuario/:id', verifyToken, getUsersByID); //un usuario
router.delete('/usuario/:id', verifyToken, deleteUsuario) //elimina usuario

//corregir este, la contrasena se cambia cada vez
router.put('/usuario/:id', verifyToken, putUsuario); //actualiza un usuario

export default router;