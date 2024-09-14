import db from "../../Database/init.js"

const Service = {

    login: async (req, res) => {
        
    },

    register: async (payload) => {

      if (payload === null) return
      
      try{
        const [id] = await db('users').insert({
          first_name: payload.first_name,
          middle_name: payload.middle_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password
        })
        const user = await db('users').where('id', id).first()
        console.log('Insert successful')

        return {status: "ok", user: user}
      } catch (e) {
        console.error('Error inserting data:', e)
        throw e
      }

    }

}

Service.register(null)

export default Service