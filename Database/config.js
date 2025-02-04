import dotenv from 'dotenv' 
dotenv.config()

const client = "mysql2";
const connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
}

const config = {
    client,
    connection,
};

export default config