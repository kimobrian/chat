# Changes

- We don't have a lot of changes in the schema since most of the change will have to happen in the logic and not the schema.

```diff
+"""
+Whether the forum should be public or private
+"""
+enum ForumState {
+  PUBLIC
+  PRIVATE
+}
+
 type Forum {
   id: ID!
   name: String
   messages: [Message]
   members: [Member]
+  state: ForumState
+  """
+  Id of forum admin
+  """
+  adminId: ID
 }

type Mutation {
   """
-  join a forum
+  join a forum. Admin can accept or reject
   """
-  join(userId: ID!, forumId: ID): SuccessMessage!
+  join(userId: ID!, forumId: ID): Boolean
   """
   create a message
   """
@@ -62,7 +62,7 @@ type Query {
   """
   members(forumId: ID!): [Member]
   """
-  return a list of forums depending on a filter. Should default to 'ALL'
+  return a list of forums depending on some filters. Should default to 'ALL'
   """
   forums(status: Status): [Forum]
   """
```

## Changed Queries

```gql
# joi query does not return anything?(boolean) since it'll be accept or reject
mutation join {
  join(userId: 8, forumId: 1)
}
```
