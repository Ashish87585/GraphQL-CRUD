const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send("Hello")
    })

    await mongoose.connect('mongodb://localhost:27017/post_db', {});
    console.log(`Mongo connected`);

    app.listen(4000, () => {
        console.log(`App is up on 4000`);
    });
}

startServer();