import {conmysql} from '../db.js';

export const postUsoApp = async (req, res) => {
    try {
        const {nombre_app, fecha, minutos_uso} = req.body;
        if (!nombre_app || !fecha || !minutos_uso){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        await conmysql.query(
            'INSERT INTO Uso_Aplicaciones (id_usuario, nombre_app, fecha, minutos_uso) VALUES (?, ?, ?, ?)',
            [req.params.id, nombre_app, fecha, minutos_uso]
        );
        res.status(201).json({ message: "Limite de uso de aplicacion registrado correctamente"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

export const getUsosByUser = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM Uso_Aplicaciones WHERE id_usuario = ?;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Uso de aplicaciones not foun'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

///generarEstadisticasUso() esto tambien se podria hacer una funcion de mysql


//verificarLimiteUso() igual esta....
