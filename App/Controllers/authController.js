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
    },

    verifyToken: async (req, res) => {
        try {
            const result = await Service.verifyToken(req.headers)
            res.send(result)
        } catch (e) {
            res.status(500).send(e.message)
        }
    },

    oauth: async (req, res) => {
        try {
            const code = req.body.code
            const provider = req.body.provider
            const userId = req.body.userId
            const result = await Service.storeOauth(code, provider, userId)
            await res.send(result)
        } catch (e) {
            res.status(500).send(e.message)
        }
    }
    
}

export default Controller