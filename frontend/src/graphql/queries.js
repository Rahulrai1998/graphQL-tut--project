import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      name
      by {
        _id
        firstname
      }
    }
  }
`;

export const MY_PROFILE = gql`
  query getMyProfile {
    myProfile {
      firstname
      lastname
      email
      quotes {
        name
      }
    }
  }
`;

export const OTHERS_PROFILE = gql`
  query getUserById($user_id: ID!) {
    user(_id: $user_id) {
      _id
      firstname
      lastname
      email
      quotes {
        name
      }
    }
  }
`;
