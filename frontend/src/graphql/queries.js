import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes{
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
      quotes{
        name
      }
    }
  }
`;
