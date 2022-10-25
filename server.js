import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./schemaGQL.js";

import { MONGO_URI } from "./config.js";
import mongoose from 'mongoose'

// DATABASE CONNECTION 
// SECOND ARGUMENTS ARE FOR PREVENTING WARNINGS IN CONSOLE
mongoose.connection(MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
  console.log("Connected to MongoDB")
})

mongoose.connection.on("error",(e)=>{
  console.log("error connecting",e)
})



//AFTER DATABASE CONNECTION
import resolvers from "./resolvers.js";

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

//mongodb+srv://rahul1998:<Exasperate98>@cluster0.el5gzfn.mongodb.net/graphql-tut-db?retryWrites=true&w=majority