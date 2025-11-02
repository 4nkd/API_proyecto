import {Router} from 'express';
import {getRutinaByUser, postCreateRutina, putEditRutina, deleteRutina, postHabitoRutina, getHabitoRutina} from '../controllers/rutinasController.js'
import {verifyToken} from '../middleware/auth.middleware.js'

const router=Router();

router.get('/rutina/:id', verifyToken, getRutinaByUser); //rutina por usuario
router.post('/rutina/:id', verifyToken, postCreateRutina); //crear rutina
router.put('/rutina/:id', verifyToken, putEditRutina); //editar rutina
router.delete('/rutina/:id', verifyToken, deleteRutina); //eliminar rutina
router.post('/rutina_habito/:id_rutina/:id_habito', verifyToken, postHabitoRutina); //asigna rutina a habito, o al revez no me acuerdo
router.get('/rutina_habito/:id', verifyToken, getHabitoRutina); //lsitar habitos de rutina

/*
{
    "nombre": "",
    "descripcion": "",
    "fecha_inicio": "",
    "fecha_fin": null
}
*/

export default router;
