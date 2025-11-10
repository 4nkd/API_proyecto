import {Router} from 'express';
import {getUsosByUser, postUsoApp} from '../controllers/usoController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/usoAplicaion/:id', verifyToken, getUsosByUser);//get users by id (obviusly)
router.post('/usoAplicaion/:id', verifyToken, postUsoApp); //el post pues



//estadistica de uso??????? ---> modificar tabla, debe de haber un progreso del uso de la aplicacion 

//verificarLimiteUso() → si excede, llama a crearAlerta() <--- no me termino de idear como seria

export default router;