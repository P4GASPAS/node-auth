import Service from "../Services/authService.js"

const Controller = {

    login: async (req, res) => {
        try {
            const payload = req.body
            payload['ip'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            payload['userAgent'] = req.headers['user-agent']

            const result = await Service.login(payload)
            res.send(result)

        } catch (e) {
            res.status(500).send(e.message)
        }
    },
    
    register: async (req, res) => {
        try {

            const payload = req.body
            payload['ip'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            payload['userAgent'] = req.headers['user-agent']

            const result = await Service.register(payload)
            res.send(result)

        } catch (e) {
            res.status(500).send(e.message)
        }
    }
    
}

export default Controller