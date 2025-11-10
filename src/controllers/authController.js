import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {conmysql} from "../db.js";

import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from '../config.js'

export const register = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;
    if (!nombre || !email || !contrasena) {3
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const [existente] = await conmysql.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    if (existente.length > 0) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }
    const hash = await bcrypt.hash(contrasena, 10);
    await conmysql.query(
      "INSERT INTO Usuarios (nombre, email, contrasena_hash) VALUES (?, ?, ?)",
      [nombre, email, hash]
    );
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor: ", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ message: "Correo y contrasena requeridos" });
    }
    const [userRows] = await conmysql.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    const user = userRows[0];
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const validPassword = await bcrypt.compare(contrasena, user.contrasena_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Contrasena incorrecta" });
    }
    const token = jwt.sign({ id_usuario: user.id_usuario }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id_usuario;
    const [rows] = await conmysql.query(
      "SELECT id_usuario, nombre, email, fecha_registro FROM Usuarios WHERE id_usuario = ?",
      [userId]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};