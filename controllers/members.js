const fixtures = require("../fixtures");

module.exports = {
  get: (forumId) => {
    const forum = fixtures.forums.find((forum) => +forum.id === +forumId);
    let memberIds = forum.members;
    if (!memberIds.length) return [];
    let members = [];
    for (let id of memberIds) {
      const member = fixtures.members.find((m) => +m.id === +id);
      if (member) members.push(member);
    }
    return members;
  },
  retrieve: (userId) => {
    const user = fixtures.members.find((user) => +user.id === +userId);
    return user;
  },
  createUser: (name, avatarURL) => {
    const userExists = fixtures.members.find((m) => m.name === name);
    if (userExists) return { message: `User named ${name} already exists` };
    const nextId = fixtures.members.length + 1;
    const newMember = { id: nextId, name, avatarURL };
    fixtures.members.push(newMember);
    return newMember;
  }
};
