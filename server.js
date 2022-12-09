import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./schemaGQL.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, MONGO_URI } from "./config.js";
import mongoose from "mongoose";

// DATABASE CONNECTION
// SECOND ARGUMENTS ARE FOR PREVENTING WARNINGS IN CONSOLE

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (e) => {
  console.log("error connecting", e);
});

// import models

import "./models/Quotes.js";
import "./models/User.js";

//AFTER DATABASE CONNECTION
import resolvers from "./resolvers.js";

// Following code is called MIDDLEWARE
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    return { userId }; // DECODED TOKEN which gives '_id'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

//mongodb+srv://rahul1998:<Exasperate98>@cluster0.el5gzfn.mongodb.net/graphql-tut-db?retryWrites=true&w=majority
