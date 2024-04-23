import { createPool } from 'mysql2/promise';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT
  } from 'settings.js'
  
export const pool = createPool({
    hostname:  DB_HOST,
    user:DB_NAME,
    password: DB_PASSWORD,
    port: DB_USER,
    database: DB_PORT,
})

