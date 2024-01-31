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
    queues: [Queue]
  }

  type Queue {
    _id: ID!
    customerName: String!
    customerMobile: String!
    createdAt: String
  }

  #! JWT
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    venue(username: String): [Venue]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addVenue(venueName: String!): Venue
    addQueue(venueId: ID!, customerName: String!, customerMobile: String!): Venue
    removeVenue(venueId: ID!): Venue
    removeQueue(venueId: ID!, queueId: ID!): Venue
  }
`;

module.exports = typeDefs;
