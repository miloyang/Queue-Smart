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
        username
        _id
        email
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
        createdAt
      }
    }
  }
`;

export const ADD_QUEUE = gql`
  #! Mutation to add queues into the venue
  mutation addQueue(
    $venueId: ID!
    $customerName: String!
    $customerMobile: String!
  ) {
    addQueue(
      venueId: $venueId
      customerName: $customerName
      customerMobile: $customerMobile
    ) {
      _id
      venueName
      queues {
        _id
        customerName
        customerMobile
        createdAt
      }
    }
  }
`;
