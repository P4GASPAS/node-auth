import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from "../../Database/init.js"
dotenv.config()

const saltRounds = 10

const signToken = (user) => {

    const basicUserInfo = {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
    }

    return jwt.sign(basicUserInfo, process.env.ACCESS_TOKEN_SECRET)
}

const Service = {

    login: async (payload) => {
        
        if (payload === null) return

        try {
            const [user] = await db('users').where('email', payload.email)
            const auth = await bcrypt.compare(payload.password, user.password)
            const token = signToken(user)
            return {
                authenticated: auth,
                user: user,
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

            const token = signToken(user)

            return {status: "ok", user: user, token: token}
        } catch (e) {
            console.error('Error inserting data:', e.message)
            throw new Error(e.message)
        }

    }

}

Service.register(null)

export default Service