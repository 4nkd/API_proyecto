import { config } from 'dotenv';
config();

// Variables de conexión a la base de datos
export const BD_HOST = process.env.BD_HOST;
export const BD_DATABASE = process.env.BD_DATABASE;
export const BD_USER = process.env.BD_USER;
export const BD_PASSWORD = process.env.BD_PASSWORD;
export const BD_PORT = process.env.BD_PORT;

// Puerto de la API
export const PORT = process.env.PORT || 10000;

// JWT (autenticación) ...
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';
