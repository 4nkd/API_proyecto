import {Router} from 'express';
import {postTareaEvento, putEditTaskEvent, deleteTaskEvent, getEventByUser} from '../controllers/tareasController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

//no registra el tipo de evento, revisar
router.post('/evento/:id', verifyToken, postTareaEvento); //crear tarea evento

router.put('/evento/:id', verifyToken, putEditTaskEvent)//edita tarea evento
router.delete('/evento/:id', verifyToken, deleteTaskEvent)//delete tarea evento
router.get('/evento/:id', verifyToken, getEventByUser)//listar tarea evento

//listarEventosCalendario??????????????????????????????????????????'

export default router;

/* 
{
    "titulo": "AWDWA",
    "descripcion": "AWDAWAWD",
    "fecha_hora_inicio": "2025-11-11 00:00:00",
    "fecha_hora_fin": "2025-11-12 00:00:00",
    "tipo": "Nose"
}
*/