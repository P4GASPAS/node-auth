import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from "../../Database/init.js"
import OauthService from './oauthService.js'
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

    },

    storeOauth: async (code, provider, userId) => {

        if(provider == "github") {

            try{
                let dbUserId = null
    
                const githubUser = await OauthService.getUserGithub(code)
    
                const id = await db('users').select('id').where('email', githubUser.email).first()
    
                if (id != undefined || id != null) dbUserId = id
    
                await db('githubs')
                    .insert({
                        github_unique_id: githubUser.id,
                        name: githubUser.name,
                        twitter_name: githubUser.twitter_username || null,
                        avatar: githubUser.avatar_url,
                        page_url: githubUser.html_url,
                        github_joined_date: githubUser.created_at,
                        user_id: dbUserId != null ? dbUserId.id : userId
                    })
                    .onConflict('github_unique_id')
                    .merge()
                    .then(() => {
                        console.log('Insert or update successful');
                    })
                    .catch(err => {
                        console.error('Insert or update failed:', err);
                    });

                return {
                    githubUser: githubUser
                }

            } catch (e) {
                console.log(e.message)
            }

            return {
                
            }

        }
        else if(provider == "facebook") {
            const facebookUser = await OauthService.getUserFacebook(code)
        }
        else if(provider == "google") {
            const googleUser = await OauthService.getUserGoogle(code)
        }

        return {
            githubUser: githubUser || null,
            facebookUser: facebookUser || null,
            googleUser: googleUser || null
        }
    }

}

// Service.register(null)

export default Service