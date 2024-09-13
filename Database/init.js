// import mysql from 'mysql2'
// import 'dotenv/config'

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_SCHEMA,
//     port: process.env.DB_PORT
// }).promise()

import knex from "knex"
import config from "./config.js"

const db = knex(config)

// const test = await db.raw('DESC users')
// console.log(test)

export default db