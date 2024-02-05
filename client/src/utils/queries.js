import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      venue {
        _id
        venueName
      }
    }
  }
`;

export const QUERY_VENUE = gql`
  query getVenue($venueId: ID!) {
    venue(venueId: $venueId) {
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

// export const QUERY_QUEUES = gql`
//   query getQueues($venueId: ID!) {
//     venue(venueId: $venueId) {
//       _id
//       venueName
//       queues {
//         _id
//         customerName
//         customerMobile
//         partySize
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_QUEUES = gql`
query Queues {
  venue {
    queues {
      customerMobile
      customerName
      partySize
    }
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      venue {
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
  }
`;
