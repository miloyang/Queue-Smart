// Import the gql tagged template function;
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    venues: Venue
  }

  type Venue {
    _id: ID
    venueName: String!
    queues: [Queue]!
  }

  type Queue {
    _id: ID!
    customerName: String!
    customerMobile: String!
    createdAt: String!
  }

  #! JWT
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User!]!
    user(username: String!): User
    venue(id: ID!): Venue
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addVenue(venueName: String!): Venue!
    removeVenue(venueId: ID!): Venue
    addQueue(
      customerName: String!
      customerMobile: String!
      venueId: ID!
    ): Queue!
  }
`;

module.exports = typeDefs;
