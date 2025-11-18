import {conmysql} from '../db.js';

export const getRutinaByUser = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Rutinas WHERE id_usuario = ?;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Rutina not found'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

//crear nueva rutina  de usuario
export const postCreateRutina = async (req, res) => {
    try {
        const {nombre, descripcion, fecha_inicio, fecha_fin} = req.body;
        if (!nombre || !descripcion || !fecha_inicio){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await conmysql.query(
            'INSERT INTO Rutinas (id_usuario, nombre, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)',
            [req.params.id, nombre, descripcion, fecha_inicio, fecha_fin]
        );
        res.status(201).json({ message: "Rutina registrado correctamente?"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

//editar rutina
export const putEditRutina = async (req, res) => {
    try {
        //req.params.id
        const {nombre, descripcion, fecha_inicio, fecha_fin}= req.body;

        if (!nombre || !descripcion || !fecha_inicio){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const [result] = await conmysql.query(
            'UPDATE Rutinas SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? '+
            'WHERE id_rutina = ?',
            [nombre, descripcion, fecha_inicio, fecha_fin, req.params.id]
        )
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo modificar la rutina'
        });
        const [row] = await conmysql.query(
            'SELECT * FROM Rutinas WHERE id_rutina = ?',
            [req.params.id]
        );
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error in the server: ' +  error.message });
    }
}

export const deleteRutina = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'DELETE FROM Rutinas WHERE id_rutina = ?',
            [req.params.id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Rutina not found'
            });
        }
        return res.json({
            message: 'Rutina deleted successfully',
            deletedId: req.params.id
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    }
};


export const postHabitoRutina = async (req, res) => {
  try {
    const { id_rutina, id_habito } = req.params;

    // Verificar si ya existe
    const [existe] = await conmysql.query(
      'SELECT * FROM Rutina_Habito WHERE id_rutina = ? AND id_habito = ?',
      [id_rutina, id_habito]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: 'Este hábito ya está asignado a la rutina.',
      });
    }

    // Si no existe, insertar
    await conmysql.query(
      'INSERT INTO Rutina_Habito (id_rutina, id_habito) VALUES (?, ?)',
      [id_rutina, id_habito]
    );

    res.status(201).json({ message: 'Hábito asignado a la rutina exitosamente.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
  }
};

/* export const postHabitoRutina = async (req, res) => {
    try {
        await conmysql.query(
            'INSERT INTO Rutina_Habito (id_rutina, id_habito) VALUES (?,?)',
            [req.params.id_rutina, req.params.id_habito]
        );
        res.status(201).json({ message: "Habito asignado a Rutina exitosamente"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
} */

/* GET TODOS LOS HABITOS DE UNA RUTINA
DEBER DE ESTAR LOS ACTIVOS?
*/
export const getHabitoRutina = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT H.id_habito, H.nombre, H.descripcion, H.frecuencia, H.hora_recordatorio, H.activo ' +
            'FROM Rutina_Habito RH ' +
            'INNER JOIN Habitos H ON RH.id_habito = H.id_habito ' +
            'WHERE RH.id_rutina = ?;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Ningun habito registrado a aquella rutina'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}
/* export const getHabitoRutina = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT H.nombre, H.descripcion, H.frecuencia, H.hora_recordatorio, H.activo ' +
            'FROM Rutina_Habito RH INNER JOIN Habitos H ' +
            'WHERE RH.id_rutina = ? AND RH.id_habito = H.id_habito;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Ningun habito registrado a aquella rutina'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
} */


// Eliminar un hábito asignado a una rutina
export const deleteHabitoDeRutina = async (req, res) => {
  try {
    const { id_rutina, id_habito } = req.params;
    const [result] = await conmysql.query(
      'DELETE FROM Rutina_Habito WHERE id_rutina = ? AND id_habito = ?',
      [id_rutina, id_habito]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'No se encontró la relación entre rutina y hábito' });
    }

    res.json({ message: 'Hábito eliminado de la rutina correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
  }
};
