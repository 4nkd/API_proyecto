import {Router} from 'express';
import {getHabitoByUser, postCreateHabito, putEditHabito, deleteHabito, putActDesactHabito} from '../controllers/habitosController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/habitos/:id', verifyToken, getHabitoByUser); //habitos por usuario
router.post('/habitos/:id', verifyToken, postCreateHabito) //crear nuevo habito
router.put('/habitos/:id', verifyToken, putEditHabito) //editar habito
router.delete('/habitos/:id', verifyToken, deleteHabito) //eliminar habito
router.put('/habitos_act_desact/:id', verifyToken, putActDesactHabito) //activar, desactivar habito

/* ejemplo para crear
{
    "nombre":"iauwbdiua", "descripcion":"no se ajjaa", "frecuencia":"DIARIO", "hora_recordatorio":"00:00:00"
}
*/


export default router;
