import { gql } from '@apollo/client';

// queries for apollo client
export const GET_ME = gql`
  #! Conditionally render data specific to logged in users profile page
  query me {
    me {
      _id
      username
      email
      venue {
        venueId
        venueName
        queue {
          queueId
          customerName
          customerMobile
          createdAt
        }
      }
    }
  }
`;