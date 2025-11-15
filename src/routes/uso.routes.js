import {Router} from 'express';
import {getUsosByUser, postUsoApp, postUsoDiarioApp, getUsoDiarioApp, getPromedioUsoApp} from '../controllers/usoController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/usoAplicacion/:id', verifyToken, getUsosByUser);//get users by id (obviusly)
router.post('/usoAplicacion/:id', verifyToken, postUsoApp); //el post pues

//pude crear otro routes y controller, pero me dio hueva
router.post('/usoAplicacion/diario/:id', verifyToken, postUsoDiarioApp) // registra el uso del día
router.get('/usoAplicacion/diario/:id', verifyToken, getUsoDiarioApp) //el uso diario de aquella app

router.get('/usoAplicacion/diario/promedio/:id', verifyToken, getPromedioUsoApp)//promedio en fecha determinada

//estadistica de uso??????? ---> modificar tabla, debe de haber un progreso del uso de la aplicacion 


//verificarLimiteUso() → si excede, llama a crearAlerta() <--- no me termino de idear como seria
// creo que esto seria en el cliente, osea en la app movil

export default router;