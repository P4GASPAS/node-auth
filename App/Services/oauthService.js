import dotenv from 'dotenv'
dotenv.config()

const OauthService = {

    getUserGithub: async (code) => {
        try {
            const token = await getTokenGithub(code)
            const url = "https://api.github.com/user"
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            })
            const resData = await res.json()
            return resData
        } catch (e) {
            console.log(e.message)
        }
        if (!res.ok) {
            console.error('Error fetching user data:', res.statusText);
            return null;
        }
        const resData = await res.json()
        return resData ? resData : null
    },

    getUserFacebook: async (code) => {
        const token = await getTokenFacebook(code)
        const url = "https://graph.facebook.com/me"
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!res.ok) {
            console.error('Error fetching user data:', res.statusText);
            return null;
        }
        const resData = await res.json()
        return resData ? resData : null
    },

    getUserGoogle: async (code) => {
        const token = await getTokenGoogle(code)
        const url = "https://www.googleapis.com/oauth2/v3/userinfo"
        const res = await fetch(url, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!res.ok) {
            console.error('Error fetching user data:', res.statusText);
            return null;
        }
        const resData = await res.json()
        return resData ? resData : null
    }

}

const getTokenGithub = async (code) => {

    try {
        const url = "https://github.com/login/oauth/access_token"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code,
                accept: 'json'
            })
        })
        const resData = await res.json()
        return resData.access_token
    } catch (e) {
        console.log(e.message)
    }
    if(resData.error_description) throw new Error(res.body.error_description)

    return resData.access_token

}



const getTokenFacebook = async (code) => {

    const url = "https://graph.facebook.com/v10.0/oauth/access_token"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            client_id: process.env.FACEBOOK_CLIENT_ID,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET,
            code,
            accept: 'json'
        })
    })
    const resData = await res.json()
    if(resData.body.error_description) throw new Error(res.body.error_description)

    return res.body.access_token

}



const getTokenGoogle = async (code) => {

    const url = "https://oauth2.googleapis.com/token"
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code,
            accept: 'json'
        })
    })
    const resData = await res.json()
    if(resData.body.error_description) throw new Error(res.body.error_description)

    return res.body.access_token

}

export default OauthService