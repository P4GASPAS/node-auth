import express from 'express'
import cors from 'cors'
import { api } from './Route/api.js'

const server = express()
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => res.send('Welcome to auth service'))

server.use('/api/auth', api)

const PORT = 2000
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await knex.destroy();
    process.exit(0);
});