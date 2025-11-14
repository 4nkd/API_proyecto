import {conmysql} from '../db.js';


export const getAlertaByUser = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Alertas WHERE id_usuario = ?;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Alertas not found user'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

//awdawd
export const postCreateAlerta = async (req, res) => {
    try {
        const {tipo_alerta, mensaje, fecha_hora} = req.body;
        
        await conmysql.query(
            'INSERT INTO Alertas (id_usuario, tipo_alerta, mensaje, fecha_hora) VALUES (?, ?, ?, ?)',
            [req.params.id, tipo_alerta, mensaje, fecha_hora]
        );
        res.status(201).json({ message: "Alerta registrada"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}


export const deleteAlerta = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'DELETE FROM Alertas WHERE id_alerta = ?',
            [req.params.id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Alerta not found'
            });
        }
        return res.json({
            message: 'Alerta deleted successfully',
            deletedId: req.params.id
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    }
};