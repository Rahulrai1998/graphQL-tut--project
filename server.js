import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import express from "express";
import http from "http";

import typeDefs from "./schemaGQL.js";
import jwt from "jsonwebtoken";
// import { MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const httpServer = http.createServer(app);

dotenv.config();
const port = process.env.PORT || 4000;

// DATABASE CONNECTION
// SECOND ARGUMENTS ARE FOR PREVENTING WARNINGS IN CONSOLE

mongoose.connect(process.env.MONGO_URI, {
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
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId }; // DECODED TOKEN which gives '_id'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
});

// EXPRESS API
if (process.env.NODE_ENV == "production") {
  app.use(express.static('frontend/build'));
  // const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname ,'frontend','build','index.html'));
  });
}

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

httpServer.listen({ port }, () => {
  console.log(`Server ready at 4000 ${server.graphqlPath}`);
});

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });

//mongodb+srv://rahul1998:<Exasperate98>@cluster0.el5gzfn.mongodb.net/graphql-tut-db?retryWrites=true&w=majority
