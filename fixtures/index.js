module.exports = {
  forums: [
    { id: 1, name: "F1", members: [1, 2, 3] },
    { id: 2, name: "F2", members: [1, 3, 4] },
    { id: 3, name: "F3", members: [5, 4, 7] },
    { id: 4, name: "F4", members: [1, 6, 7] },
    { id: 5, name: "F5", members: [] },
    { id: 6, name: "F6", members: [] }
  ],
  members: [
    { id: 1, name: "Kimo", avatarURL: "url" },
    { id: 2, name: "Joy", avatarURL: "url" },
    { id: 3, name: "Ken", avatarURL: "url" },
    { id: 4, name: "Mercy", avatarURL: "url" },
    { id: 5, name: "Alex", avatarURL: "url" },
    { id: 6, name: "John", avatarURL: "url" },
    { id: 7, name: "Mary", avatarURL: "url" }
  ],
  messages: [
    {
      id: 1,
      message: "Hi",
      userId: 1,
      forumId: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      message: "Yo",
      userId: 1,
      forumId: 1,
      createdAt: new Date(
        new Date().setMinutes(Math.random() * 59)
      ).toISOString()
    },
    {
      id: 3,
      message: "Good morning",
      userId: 1,
      forumId: 1,
      createdAt: new Date(
        new Date().setMinutes(Math.random() * 59)
      ).toISOString()
    },
    {
      id: 4,
      message: "Good evening..",
      userId: 1,
      forumId: 2,
      createdAt: new Date(
        new Date().setMinutes(Math.random() * 59)
      ).toISOString()
    },
    {
      id: 5,
      message: "Hey",
      userId: 1,
      forumId: 2,
      createdAt: new Date(
        new Date().setMinutes(Math.random() * 59)
      ).toISOString()
    }
  ]
};
