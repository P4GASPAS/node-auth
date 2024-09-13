import knex from "knex"
import config from "./config.js"

const db = knex(config)

// const test = await db.raw('DESC users')
// console.log(test)

export default db