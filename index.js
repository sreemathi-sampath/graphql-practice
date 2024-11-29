import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db.js";

import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(parent, args, context, info) {
      return db.reviews.find((review) => review.id == args.id);
    },
    game(parent, args, context, info) {
      return db.games.find((game) => game.id == args.id);
    },
    author(parent, args, context, info) {
      return db.authors.find((author) => author.id == args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
