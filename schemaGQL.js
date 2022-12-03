import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    quote(by: ID!): [Quote]
  }

  type User {
    _id: ID
    firstname: String
    lastname: String
    email: String
    password: String
    quotes: [Quote]
  }
 
  type Quote {
    name: String
    by: ID
  }

  type Token{
    token:String
  }
        
  type Mutation {
    signupNewUser(data: mutationArgs!): User
    signInUser(signIndata: UserSignInArgs!) : Token
    
  }

  input mutationArgs {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
  }

  input UserSignInArgs {
    
    email: String!
    password: String!
  }
`;

export default typeDefs;
