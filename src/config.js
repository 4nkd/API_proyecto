import {config} from 'dotenv'
config()

export const BD_HOST=process.env.BD_HOST || 'mysql-project-kq152004-cbe1.k.aivencloud.com'
export const BD_DATABASE=process.env.BD_DATABASE || 'proyecto'
export const BD_USER=process.env.BD_USER ||'avnadmin'
export const BD_PASSWORD=process.env.BD_PASSWORD || 'AVNS_DGirkqOuaZiFJjfK2bu'
export const BD_PORT=process.env.BD_PORT || 10210;


export const PORT=process.env.PORT || 10000;


//JWT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'Qe^St!Q92Z99!mJKS4000zt^vPn6C';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d'