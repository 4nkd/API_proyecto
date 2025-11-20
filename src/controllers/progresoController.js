import {conmysql} from '../db.js';



//registrar progreso
export const postRegistraProgreso = async (req, res) => {
  try {
    const { fecha, completado } = req.body;

    // 🕒 Verificar si ya existe un registro para este hábito y fecha
    const [existe] = await conmysql.query(
      'SELECT * FROM Progreso_Habitos WHERE id_habito = ? AND fecha = ?',
      [req.params.id, fecha]
    );

    if (existe.length > 0) {
      return res.status(400).json({ 
        message: 'Ya registraste este hábito hoy 🕒' 
      });
    }

    // Si no existe, insertar normalmente
    await conmysql.query(
      'INSERT INTO Progreso_Habitos (id_habito, fecha, completado) VALUES (?, ?, ?)',
      [req.params.id, fecha, completado]
    );

    res.status(201).json({ message: "Progreso de hábito registrado" });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
  }
};



export const getProgresoByUser = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      'SELECT H.id_habito, H.nombre, PH.completado, PH.fecha ' +
      'FROM Progreso_Habitos PH ' +
      'INNER JOIN Habitos H ON PH.id_habito = H.id_habito ' +
      'WHERE H.id_usuario = ?',
      [req.params.id]
    );

    if (result.length <= 0) {
      return res.json({
        cant: 0,
        data: [],
        message: 'Progreso de hábitos no encontrado para usuario'
      });
    }

    res.json({
      cant: result.length,
      data: result
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error in the server: ' + error.message });
  }
};



export const getEstadisticaProgreso = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT estadisticaProgreso(?);',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Error creo...'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}
//estaditica habito?????




//registrar progreso
/* export const postRegistraProgreso = async (req, res) => {
    try {
        const {fecha, completado} = req.body;
        
        await conmysql.query(
            'INSERT INTO Progreso_Habitos (id_habito, fecha, completado) VALUES (?, ?, ?)',
            [req.params.id, fecha, completado]
        );
        res.status(201).json({ message: "progreso de habito registrado"});
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}


export const getProgresoByUser = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT H.nombre, PH.completado, PH.fecha ' +
            'FROM Progreso_Habitos PH ' +
            'INNER JOIN Habitos H '+
            'ON PH.id_habito = H.id_habito ' +
            'WHERE H.id_usuario = ?',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Progreso de habitos no encontrado apra usuario'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
}

export const getEstadisticaProgreso = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT estadisticaProgreso(?);',
            [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Error creo...'
        });
        res.json({
            cant: result.length,
            data: result
        })
    }catch (error){
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    };
} */
//estaditica habito?????