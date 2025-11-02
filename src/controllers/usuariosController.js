import {conmysql} from '../db.js';
import bcrypt from "bcryptjs";

//import jwt from 'jsonwebtoken';
//import { JWT_SECRET_KEY } from '../config.js';

export const getUsers = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Usuarios');
        res.json({
            cant: result.length,
            data: result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el server: ' + error.message });
    }
}


export const getUsersByID = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [req.params.id]);
        if(result.length <= 0) return res.json({
            cant: 0,
            message: 'Client not found'
        });
        res.json({
            cant: result.length,
            data: result[0]
        })
    }catch (error){
        return res.status(500).json({ message: 'Ераро ен ла сервидоро' + error.message });
    };
}

//acutalizar usuario, mirar bien pues cambia la contra cada cambio. Posiblemente tenga que hacer un update aparte para contrasena
export const putUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, email, contrasena}= req.body;

        const hash = await bcrypt.hash(contrasena, 10);

        const [result] = await conmysql.query(
            'UPDATE Usuarios SET nombre = ?, email = ?, contrasena_hash = ? WHERE id_usuario = ?',
            [nombre, email, hash, id]
        )
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'User not found putClient'
        });
        const [row] = await conmysql.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [req.params.id]);
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error in the server: ' +  error.message });
    }
}


export const deleteUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const [result] = await conmysql.query(
            'DELETE FROM Usuarios WHERE id_usuario = ?', [id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.json({
            message: 'User deleted successfully',
            deletedId: id
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Error in the server: ' + error.message });
    }
};