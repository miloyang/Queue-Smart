const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    venue: Venue
  }

  type Venue {
    _id: ID
    venueName: String!
    queue: [Queue]!
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
    me: User
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
    removeQueue(
      customerName: String!
      customerMobile: String!
      venueId: ID!
    ): Queue!
  }
`;

module.exports = typeDefs;
