import users from "./users.js";
import rents from "./rents.js";

export default {
  User: {
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },
  Query: {
    ...users.Query,
    ...rents.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...rents.Mutation,
  },
};
