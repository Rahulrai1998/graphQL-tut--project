import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    users:[User]
    user(id:ID!):User
    quotes:[Quote]
    quote(by:ID!):[Quote]
  }

  type User{
    id:ID
    firstname:String
    lastname:String
    email:String
    password:String
    quotes:[Quote]
  }

  type Quote{
    name:String  
    by:ID
  }

  type Mutation{
    signupNewUser(firstname:String!,lastname:String,email:String!,password:String!):User
  }
`;

export default typeDefs;