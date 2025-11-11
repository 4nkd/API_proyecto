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

export const postUsoDiarioApp = async (req, res) => {
    try {
        const {fecha, total_minutos} = req.body;

        if (!fecha || !total_minutos){
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        await conmysql.query(
            'INSERT INTO Uso_App_Diario (id_uso, fecha, total_minutos) VALUES (?, ?, ?)',
            [req.params.id, fecha, total_minutos]
        );
        res.status(201).json({ message: "uso de diario de aplicacion registrado correctamente"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}


export const getUsoDiarioApp = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * from uso_app_diario WHERE id_uso = ?;',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'No hay uso registrados de la app'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

export const getPromedioUsoApp = async (req, res) => {
    try {
        const {dias} = req.body;

        const [result_prom] = await conmysql.query(
            'SELECT estadisticaUsoApp(?, ?) AS promedio_uso;',
            [req.params.id, dias]);

        const [result_total] = await conmysql.query(
            'SELECT COALESCE(SUM(total_minutos), 0) FROM Uso_App_Diario WHERE id_uso = ? AND fecha BETWEEN DATE_SUB(CURDATE(), INTERVAL ? DAY) AND CURDATE();',
            [req.params.id, dias]);

        if(result_prom.length <= 0 ) return res.json({
            cant: 0,
            message: 'Error al conseguir promedio'
        });
        if(result_total.length <= 0 ) return res.json({
            cant: 0,
            message: 'Error al conseguir total'
        });

        res.json({
            cant: {
                cant_prom: result_prom.length,
                cant_total: result_total.length
            },
            data: {
                data_prom: result_prom,
                data_total: result_total
            }
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

///generarEstadisticasUso() esto tambien se podria hacer una funcion de mysql


//verificarLimiteUso() igual esta....
