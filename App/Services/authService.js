import db from "../../Database/init.js"

const Service = {

    login: async (req, res) => {
        
    },

    register: async (payload) => {
        await db('users').insert({
            first_name: 'yhestin',
            middle_name: 'basas',
            last_name: 'jamili',
            authorization: 'customer',
            email: 'yhestin10@gmail.com',
            password: 'yhestin123',
            info_id: null,
            github_id: null,
            facebook_id: null,
            google_id: null,
            motorcycle_id: null
          })
          .then(() => console.log('Insert successful'))
          .catch(err => console.error('Insert failed:', err))
          .finally(() => {
            db.destroy();
          });
    }

    // register: async (payload) => {
    //     await db('users').insert({
    //         first_name: 'yhestin',
    //         middle_name: 'basas',
    //         last_name: 'jamili',
    //         authorization: 'customer',
    //         email: 'yhestin10@gmail.com',
    //         password: 'yhestin123',
    //         info_id: null,
    //         github_id: null,
    //         facebook_id: null,
    //         google_id: null,
    //         motorcycle_id: null
    //       })
    //       .then(() => console.log('Insert successful'))
    //       .catch(err => console.error('Insert failed:', err))
    //       .finally(() => {
    //         db.destroy();
    //       });
    // }

}

console.log(Service.register(null))

export default Service