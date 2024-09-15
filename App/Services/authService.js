import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from "../../Database/init.js"
dotenv.config()

const saltRounds = 10

const formatUser = (user) => {
    return {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        authorization: user.authorization,
        email: user.email,
    }
}

const signToken = (user) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

const Service = {

    login: async (payload) => {
        
        if (payload === null) return

        try {
            const [user] = await db('users').where('email', payload.email)
            const auth = await bcrypt.compare(payload.password, user.password)

            const token = signToken(formatUser(user))
            return {
                authenticated: auth,
                user: formatUser(user),
                token: token
            }
        } catch (e) {
            console.error('Error authenticating the data:', e.message)
            throw new Error(e.message)
        }

    },

    register: async (payload) => {

        if (payload === null) return

        try{
            const [id] = await db('users').insert({
                first_name: payload.first_name,
                middle_name: payload.middle_name,
                last_name: payload.last_name,
                nickname: payload.nickname || null,
                email: payload.email,
                email_verified_at: payload.email_verified_at || null,
                password: await bcrypt.hash(payload.password, saltRounds),
                ip: payload.ip || null,
                user_agent: payload.userAgent || null,
            })
            const user = await db('users').where('id', id).first()
            console.log('Insert successful')

            const token = signToken(formatUser(user))

            return {
                status: "ok",
                user: formatUser(user),
                token: token
            }
        } catch (e) {
            console.error('Error inserting data:', e.message)
            throw new Error(e.message)
        }

    },

    verifyToken: async (payload) => {

        if(payload === null) return

        const token = payload.authorization && payload.authorization.split(' ')[1]

        if (token === null) throw new Error("Invalid token")
        
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        return {
            token: token,
            user: user
        }

    }

}

Service.register(null)

export default Service