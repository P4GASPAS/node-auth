import Service from "../Services/authService.js"

const Controller = {

    login: async (req, res) => {
        res.send('login ok')
    },
    
    register: async (req, res) => {
        try {

            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            const userAgent = req.headers['user-agent']

            let payload = req.body
            payload['ip'] = ip
            payload['userAgent'] = userAgent


            const result = await Service.register(payload)

            res.send(result)

        } catch (e) {
            res.status(500).send(e.message)
        }
    }
    
}

export default Controller