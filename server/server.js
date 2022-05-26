const path = require('path');

const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// import middleware function which verifies the provided JWT
const { authMiddleware } = require('./utils/auth');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware 
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
await server.start();
// integrate our Apollo server with the Express application as middleware
// this creates a special endpoint /graphql for the Express.js server
// that serves as the main endpoint for accessing the entire API.
server.applyMiddleware({ app });

// Here we check if the node environment is in production and serve the files in
// the Reac application's directory /client/build
// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// If a GET request to any location on the server that does not explicitly have a route defined,
// respond with the production-ready React front-end code.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`***** API server running on port ${PORT}! *****`);
      // log where we can go to test our GQL API
      console.log(`***** Use GraphQL at http://localhost:${PORT}${server.graphqlPath} *****`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);