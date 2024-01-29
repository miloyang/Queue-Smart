import { gql } from '@apollo/client';

// queries for apollo client
export const GET_ME = gql`
  #! Conditionally render data specific to logged in users profile page
  {
    me {
      _id
      username
      email
      venue {
        venueId
        venueName
      }
    }
  }
`;