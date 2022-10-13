import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {quotes,users} from './fakedb.js'
const typeDefs = gql`
  type Query {
    users:[User]
    quotes:[Quote]
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
`;

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    quotes:()=> quotes
  },  

  User:{
    quotes: (ur)=>quotes.filter(quote=> quote.by == ur.id )

    
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins:[
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})

