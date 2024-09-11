import express from 'express'
import { api } from './Route/api.js'

const server = express()
server.use(express.json)

server.get('/', (req, res) => res.send('Welcome to auth service'))

server.use('/api/auth', api)

const PORT = 2000
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})