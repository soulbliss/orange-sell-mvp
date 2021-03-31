const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const moment = require('moment'); 

const { GraphQLServer, PubSub } = require("graphql-yoga");

// environment variables defined in the path file
require('dotenv').config({ path: 'variables.env' });


// Models defined
const User = require('./models/User');
const Item = require('./models/Item');



// connects to DB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


// load up defined type definitions and resolvers
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');


// instantiate schema
const schema = {
    typeDefs: typeDefs,
    resolvers: resolvers
}


const PORT = process.env.PORT || 7000;
const grapql_server_options = {
    port: PORT,
    endpoint: '/graphql',
    playground: '/playground',
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async ({ request }) => {

        const token = request.headers['authorization'];

        let currentUser;

        if (token !== "null") {

            try {
    
                currentUser = await jwt.verify(token, process.env.SECRET);
                
            } catch (err) {
    
                

                currentUser = '';
    
            }
        }
    
        
        return { Item, User, currentUser };
      }
})





server.express.use(cors('*'));



if (process.env.NODE_ENV === 'production') {
    server.express.use(express.static('client/build'));

    server.express.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        //console.log("A new request got processed at:", moment().format('MMMM Do YYYY, h:mm:ss a'));
    })
}



server.start(grapql_server_options, ({ port }) =>
    console.log(`🚀 Server ready at http://localhost:7000`))
