import {conmysql} from '../db.js';

//get habitos por usuario
export const getHabitoByUser = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Habitos WHERE id_usuario = ?', [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Habitos not found'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}


// Obtener un hábito por su ID
export const getHabitoById = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Habitos WHERE id_habito = ?',
            [req.params.id]
        );
        if (result.length <= 0)
            return res.json({ cant: 0, message: 'Habito not found' });
        res.json({ cant: result.length, data: result[0] });
    } catch (error) {
        return res.status(500).json({
            message: 'Error in the server: ' + error.message
        });
    }
};



//crear nuevo habito  de usuario
export const postCreateHabito = async (req, res) => {
    try {
        const {nombre, descripcion, frecuencia, hora_recordatorio} = req.body;

        if (!nombre || !descripcion || !frecuencia || !hora_recordatorio){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await conmysql.query(
            'INSERT INTO Habitos (id_usuario, nombre, descripcion, frecuencia, hora_recordatorio, activo) VALUES (?, ?, ?, ?, ?, 1)',
            [req.params.id, nombre, descripcion, frecuencia, hora_recordatorio]
        );
        res.status(201).json({ message: "Habito registrado correctamente?"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

//actualizar habito
export const putEditHabito = async (req, res) => {
    try {
        const {nombre, descripcion, frecuencia, hora_recordatorio}= req.body;

        if (!nombre || !descripcion || !frecuencia || !hora_recordatorio){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const [result] = await conmysql.query(
            'UPDATE Habitos SET nombre = ?, descripcion = ?, frecuencia = ?, hora_recordatorio = ? '+
            ' WHERE id_habito = ? ',
            [nombre, descripcion, frecuencia, hora_recordatorio,req.params.id]
        )
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo modificar el habito'
        });
        const [row] = await conmysql.query(
            'SELECT * FROM Habitos WHERE id_habito = ?',
            [req.params.id]
        );
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error in the server: ' +  error.message });
    }
}

//eliminar habito
export const deleteHabito = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'DELETE FROM Habitos WHERE id_habito = ?',
            [req.params.id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Hbito not found'
            });
        }
        return res.json({
            message: 'Habito deleted successfully',
            deletedId: req.params.id
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    }
};

export const putActDesactHabito = async (req, res) => {
    try {
        const {activo}= req.body;
        const [result] = await conmysql.query(
            'UPDATE Habitos SET activo = ? ' +
            'WHERE  id_habito = ?',
            [activo, req.params.id]
        )
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo modificar el habito'
        });
        const [row] = await conmysql.query(
            'SELECT nombre, activo FROM Habitos WHERE id_usuario = ? AND id_habito = ?',
            [req.params.id_usuario, req.params.id_habito]
        );
        res.json(
            row[0]
        );
    } catch (error) {
        return res.status(500).json({ message: 'Error in the server: ' +  error.message });
    }
}