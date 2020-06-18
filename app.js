const logger = require("morgan");
const { join } = require("path");
const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const { importSchema } = require("graphql-import");

const resolvers = require("./resolvers");

const typeDefs = importSchema(join(__dirname, "./typeDefs/schema.graphql"));

const { ENV } = process.env;

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
