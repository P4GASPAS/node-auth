import bcrypt from 'bcryptjs'
import db from "../../Database/init.js"

const saltRounds = 10

const Service = {

    login: async (payload) => {
        
        if (payload === null) return

        try {
            const [user] = await db('users').where('email', payload.email)
            const auth = await bcrypt.compare(payload.password, user.password)
            return {
                authenticated: auth,
                user: user
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

            return {status: "ok", user: user}
        } catch (e) {
            console.error('Error inserting data:', e.message)
            throw new Error(e.message)
        }

    }

}

Service.register(null)

export default Service