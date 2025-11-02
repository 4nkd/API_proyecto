import {conmysql} from '../db.js';

export const postTareaEvento = async (req, res) => {
    try {
        const {titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, tipo} = req.body;

        if (!titulo || !descripcion || !fecha_hora_inicio || !tipo){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await conmysql.query(
            'INSERT INTO Tareas_Eventos '+
            '(id_usuario, titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, tipo) '+
            'VALUES (?, ?, ?, ?, ?, ?)',
            [req.params.id, titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, tipo]
        );
        res.status(201).json({ message: "Evento registrado correctamente?"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

export const putEditTaskEvent = async (req, res) => {
    try {
        const {titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, tipo}= req.body;

        if (!titulo || !descripcion || !fecha_hora_inicio || !tipo){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const [result] = await conmysql.query(
            'UPDATE Tareas_Eventos SET titulo = ?, descripcion = ?, fecha_hora_inicio = ?, fecha_hora_fin = ?, tipo = ? '+
            'WHERE id_evento = ?',
            [titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, tipo, req.params.id]
        )
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'No se pudo modificar la Tarea/Evento',
        });
        const [row] = await conmysql.query(
            'SELECT * FROM Tareas_Eventos WHERE id_evento = ?',
            [req.params.id]
        );
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error in the server: ' +  error.message });
    }
}

export const deleteTaskEvent = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'DELETE FROM Tareas_Eventos WHERE id_evento = ?',
            [req.params.id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Tarea o Evento o lo que sea not found'
            });
        }
        return res.json({
            message: 'Tarea o evneto deleted successfully',
            deletedId: req.params.id
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    }
};

export const getEventByUser = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Tareas_Eventos WHERE id_usuario = ?;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'auyvuawibfiuw not found'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}





