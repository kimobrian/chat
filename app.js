const logger = require("morgan");
const express = require("express");
require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");

const { ENV } = process.env;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello people!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: ["development", "staging"].includes(ENV)
});

const app = express();
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ sneakers: "Welcome to Sneaker search" });
});

server.applyMiddleware({ app });

module.exports = { app, server };
