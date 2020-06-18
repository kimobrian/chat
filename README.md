# Chat ([Spec file](Coding-test-backend.md))

A simple chat app using GraphQL

## Installation and Running

- Pre-requisites

  > Node JS installation

- Clone the repo:

  > ssh: `git@github.com:kimobrian/chat.git`
  > https: `https://github.com/kimobrian/chat.git`

- Switch into the directory with `cd chat`
- Install dependencies with `yarn` or `npm i`
- You can run the app in dev or prod mod:

  > Dev: `yarn start:dev`

  > Prod: `yarn start`

- Access the app in the browser using the URL `http://localhost:3000/graphql`

### Types

```gql
type Message {
  id: ID!
  message: String!
  forum: Forum
  user: Member
  createdAt: String
}

type Forum {
  id: ID!
  name: String
  messages: [Message]
  members: [Member]
}

type Member {
  id: ID!
  name: String
  avatarURL: String
}

type SuccessMessage {
  message: String!
}

union ForumCreated = Forum | SuccessMessage
union UserCreated = Member | SuccessMessage
union MessageCreated = Message | SuccessMessage

enum Status {
  """
  All forums
  """
  ALL
  """
  Only forums I've joined
  """
  JOINED
  """
  Forums I'm not in
  """
  NOT_JOINED
}

input MessageInput {
  userId: ID!
  forumId: ID!
  message: String
}

input User {
  name: String!
  avatarURL: String
}

type Mutation {
  """
  join a forum
  """
  join(userId: ID!, forumId: ID): SuccessMessage!
  """
  create a message
  """
  message(params: MessageInput!): MessageCreated!
  """
  create a forum
  """
  createForum(name: String!, userId: ID!): ForumCreated!
  """
  create a new user
  """
  createUser(params: User!): User
}

type Query {
  """
  return members in a certain forum
  """
  members(forumId: ID!): [Member]
  """
  return a list of forums depending on a filter. Should default to 'ALL'
  """
  forums(status: Status): [Forum]
  """
  return a single forum with members and messages
  """
  forum(forumId: ID!): Forum
}

type Subscription {
  """
  subscribe to new messages
  """
  messageCreated: MessageCreated
}
```

### Sample Usage

```gql
# Fetch all members in a forum
query members {
  members(forumId: 1) {
    id
    name
    avatarURL
  }
}

# Return a forum with members and messages
query forum {
  forum(forumId: 6) {
    id
    name
    members {
      id
      name
      avatarURL
    }
    messages {
      id
      message
      createdAt
      sender: user {
        id
        name
        avatarURL
      }
    }
  }
}

# Return all forums
query forums {
  forums {
    id
    name
  }
}

# Join a forum
mutation join {
  join(userId: 8, forumId: 1) {
    message
  }
}

# Create a forum
mutation createForum {
  createForum(name: "Forum Y", userId: 1) {
    ... on SuccessMessage {
      message
    }
    ... on Forum {
      id
      name
      messages {
        id
        message
        user {
          id
          name
        }
      }
      members {
        id
        name
      }
    }
  }
}

# Create a user
mutation createUser {
  createUser(params: { name: "Jay" }) {
    ... on SuccessMessage {
      message
    }
    ... on Member {
      id
      name
      avatarURL
    }
  }
}

#Create a message
mutation createMessage {
  message(params: { userId: 1, forumId: 1, message: "Hi people" }) {
    ... on SuccessMessage {
      message
    }
    ... on Message {
      id
      message
      createdAt
      forum {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
}
```
