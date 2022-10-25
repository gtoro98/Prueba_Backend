const User = require('../models/user.model')

const resolvers = {

    Query: {
        hello: () => 'Hello world',
        getAllUsers: async () => {
            const users = await User.find()
            return users
        }
    },

    Mutation: {
        createUser: async (_: any, args: any) => {
            const {name, email, password} = args
            const newUser = new User({name, email, password})

            await newUser.save()

            return newUser
        }
    }
}

module.exports = { resolvers };
export { };