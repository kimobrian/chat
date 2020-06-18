const fixtures = require("../fixtures");

module.exports = {
  get: () => {
    return fixtures.forums.map((forum) => {
      return { id: forum.id, name: forum.name };
    });
  },
  retrieve: (forumId) => {
    const forum = fixtures.forums.find((forum) => +forum.id === +forumId);
    return forum;
  },
  getMessages: (forumId) => {
    return fixtures.messages.filter((msg) => +msg.forumId === +forumId);
  },
  joinForum: (userId, forumId) => {
    const forum = fixtures.forums.find((forum) => +forum.id === +forumId);
    if (!forum)
      return {
        message: `Forum with ID ${forumId} does not exist. You can create it`
      };
    if (!forum.members.length) forum.members.push(+userId);
    if (forum.members.includes(+userId))
      return {
        message: `You're already in ${forum.name}`
      };
    else forum.members.push(+userId);
    return { message: `Joined ${forum.name}` };
  },
  createForum: (name, userId) => {
    const forumExists = fixtures.forums.find((forum) => forum.name === name);
    if (forumExists) return { message: `Forum ${name} already xists` };
    const nextId = fixtures.forums.length;
    const newForum = { id: nextId, name, members: [+userId] };
    fixtures.forums.push(newForum);
    return newForum;
  },
  createMessage: (userId, forumId, message) => {
    const forumExists = fixtures.forums.find((forum) => +forum.id === +forumId);
    if (!forumExists)
      return { message: `Forum with ID ${forumId} does not exist` };
    const userExists = fixtures.members.find((m) => +m.id === +userId);
    if (!userExists)
      return { message: `User with ID ${userId} does not exist` };
    const nextIndex = fixtures.messages.length + 1;
    const newMessage = {
      id: nextIndex,
      userId,
      forumId,
      message,
      createdAt: new Date(
        new Date().setMinutes(Math.random() * 59)
      ).toISOString()
    };
    fixtures.messages.push(newMessage);
    return newMessage;
  }
};
