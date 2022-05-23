// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
// we access our GraphQL API through queries and mutations. Here we define a
// custom data type 'Thought' which is used in the query below
// called 'thoughts'. We instruct the query 'thoughts' to return
// the properties _id, thoughtText, createdAt, etc.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user (username: String!): User
    thoughts (username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
