// Import the gql tagged template function;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    venues: [Venue]
}

#! JWT
type Auth {
  token: ID!
  user: User
}`

module.exports = typeDefs