const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();
const { forums, members } = require("../controllers");

module.exports = {
  Query: {
    members(root, { forumId }) {
      return members.get(forumId);
    },
    /* messages(root, { forumId }) {
      const fId = forumId || root.id;
      return forums.getMessages(fId);
    }, */
    forums(_, { status = "ALL" }) {
      return forums.get(status);
    },
    forum(_, { forumId }) {
      return forums.retrieve(forumId);
    }
  },
  Message: {
    forum(msg) {
      return forums.retrieve(msg.forumId);
    },
    user(msg) {
      return members.retrieve(msg.userId);
    }
  },
  Forum: {
    members(forum) {
      return members.get(forum.id);
    },
    messages(forum) {
      return forums.getMessages(forum.id);
    }
  },
  ForumCreated: {
    __resolveType(obj) {
      if (obj.message) {
        return "SuccessMessage";
      } else return "Forum";
    }
  },
  UserCreated: {
    __resolveType(obj) {
      if (obj.message) {
        return "SuccessMessage";
      } else return "Member";
    }
  },
  MessageCreated: {
    __resolveType(obj) {
      if (obj.message) {
        return "SuccessMessage";
      } else return "Message";
    }
  },
  Mutation: {
    join(_, { userId, forumId }) {
      return forums.joinForum(userId, forumId);
    },
    message(_, { params: { userId, forumId, message } }) {
      const msg = forums.createMessage(userId, forumId, message);
      pubsub.publish("MESSAGE_CREATED", { ...msg });
      return msg;
    },
    createForum(_, { name, userId }) {
      return forums.createForum(name, userId);
    },
    createUser(_, { params: { name, avatarUrl = "url" } }) {
      return members.createUser(name, avatarUrl);
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"])
    }
  }
};
