require('dotenv').config();
import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import { ApolloServer, gql } from 'apollo-server-express'
const { typeDefs } = require('./apollo/typeDefs')
const { resolvers } = require('./apollo/resolvers')


const app = express();

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.use("*", (req, res) => res.status(404).send("Page Not Found"));
    
}
startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', require('./routes/auth.routes'))
app.use('/api', require('./routes/user.routes'))


const port = config.get<number>('port');

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);

  connectDB();
});