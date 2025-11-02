import {config} from 'dotenv'
config()

export const BD_HOST=process.env.BD_HOST || 'localhost'
export const BD_DATABASE=process.env.BD_DATABASE || 'proyecto'
export const BD_USER=process.env.BD_USER ||'root'
export const BD_PASSWORD=process.env.BD_PASSWORD || ''
export const BD_PORT=process.env.BD_PORT || 3306


export const PORT=process.env.PORT || 3000


//JWT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'superclave';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'