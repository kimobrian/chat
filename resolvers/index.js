const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();

module.exports = {
  Query: {
    members(root, args) {
      return "members";
    },
    messages(root, args) {
      return "messages";
    },
    forums(root, args) {
      return "forums";
    }
  },
  Mutation: {
    join(root, args) {
      return "join";
    },
    message(root, args) {
      pubsub.publish("MESSAGE_CREATED", { messageCreated: args });
      return "message";
    },
    createForum(root, args) {
      return "forum";
    },
    createUser(root, args) {
      return "user";
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"])
    }
  }
};
