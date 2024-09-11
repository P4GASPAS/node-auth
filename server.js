import express from 'express'

const server = express()

server.get('/', (req, res) => res.send('Welcome to auth service'))

const PORT = 2000
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})