const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

// importing the apollo server
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
// const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
//   await server.start();

//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());

//   app.use('/graphql', expressMiddleware(server, {
//     context: authMiddleware
//   }));

//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`🌍 API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });
// };

// // Call the async function to start the server
//   startApolloServer();

// Start the Apollo server
const startServer = async (typeDefs, resolvers) => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, 
    persistedQueries: false,
  });

  // Set URL encoded data
app.use(express.urlencoded({ extended: true })); //? If true, data is parsed with qs library which allows nested objects from query string. If false, data is parsed with querystring library which does not support nested objects from query strings
// Every request goes through this middleware and gets converted to JSON
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Catch-all route where any route that isnt defined is treated as a 404 error
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

  // start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where to go to test GQL API
  console.info(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  // Import Mongoose connections the first time the connection is opened
  db.once('open', () => {
    // Start the server on successful connection
    app.listen(PORT, () =>
      console.info(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

// Initialize the Apollo server
startServer(typeDefs, resolvers);
