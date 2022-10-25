import { gql } from "apollo-server-express"

const typeDefs = gql`

    type User {
        user_id: ID
        name: String
        email: String
        password: String
    }

    type Query{
        hello: String
        getAllUsers: [User]
    }

    type Mutation {
        createUser(name: String, email: String, password: String): User
    }
`

module.exports =  {typeDefs};