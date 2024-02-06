const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: 'bounded', // Use a bounded cache for persisted queries
  persistedQueries: false, // Disable persisted queries 
});

// Set URL encoded data
app.use(express.urlencoded({ extended: false })); //? If true, data is parsed with qs library which allows nested objects from query string. If false, data is parsed with querystring library which does not support nested objects from query strings
// Every request goes through this middleware and gets converted to JSON
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Catch-all route where any route that isnt defined is treated as a 404 error
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // Import Mongoose connections the first time the connection is opened
  db.once("open", () => {
    // Start the server on successful connection
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      // log where to go to test GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
