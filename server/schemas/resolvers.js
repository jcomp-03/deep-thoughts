const { User, Thought } = require("../models");

// Here we define an object resolvers which has a
// nested object Query that contains a method helloWorld
// which as the same name as the query or mutation for which
// it is resolving
const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      // we pass the params object--with or without data--into find method
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("friends");
    },
  },
};

module.exports = resolvers;
