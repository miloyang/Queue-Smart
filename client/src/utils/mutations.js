import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  #! Mutation for users to login
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  #! Mutation to add users
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_VENUE = gql`
  #! Mutation to add a venue
  mutation addVenue($venueName: String!) {
    addVenue(venueName: $venueName) {
      _id
      venueName
      queues {
        _id
        customerName
        customerMobile
        partySize
        createdAt
      }
    }
  }
`;

export const ADD_QUEUE = gql`
  #! Mutation to add queues into the venue
  mutation AddQueue(
    $venueId: ID!
    $customerName: String!
    $customerMobile: String!
    $partySize: Int!
  ) {
    addQueue(
      venueId: $venueId
      customerName: $customerName
      customerMobile: $customerMobile
      partySize: $partySize
    ) {
      _id
      queues {
        _id
        createdAt
        customerMobile
        customerName
        partySize
      }
      venueName
    }
  }
`;

export const REMOVE_QUEUE = gql`
  mutation RemoveQueue($venueId: ID!, $queueId: ID!) {
    removeQueue(venueId: $venueId, queueId: $queueId) {
      _id
      venueName
      queues {
        _id
        customerName
      }
    }
  }
`;
