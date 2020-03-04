import { gql } from '@apollo/client'

export const typeDefs = gql`
  directive @embedded on OBJECT
  directive @collection(name: String!) on OBJECT
  directive @index(name: String!) on FIELD_DEFINITION
  directive @resolver(
    name: String
    paginated: Boolean! = false
  ) on FIELD_DEFINITION
  directive @relation(name: String) on FIELD_DEFINITION
  directive @unique(index: String) on FIELD_DEFINITION
  scalar Date
  scalar Long

  type Mutation {
    # Create a new document in the collection of 'Todo'
    createTodo(
      # 'Todo' input values
      data: TodoInput!
    ): Todo!
    # Update an existing document in the collection of 'User'
    updateUser(
      # The 'User' document's ID
      id: ID!
      # 'User' input values
      data: UserInput!
    ): User
    # Create a new document in the collection of 'User'
    createUser(
      # 'User' input values
      data: UserInput!
    ): User!
    # Delete an existing document in the collection of 'Todo'
    deleteTodo(
      # The 'Todo' document's ID
      id: ID!
    ): Todo
    # Delete an existing document in the collection of 'User'
    deleteUser(
      # The 'User' document's ID
      id: ID!
    ): User
    # Update an existing document in the collection of 'Todo'
    updateTodo(
      # The 'Todo' document's ID
      id: ID!
      # 'Todo' input values
      data: TodoInput!
    ): Todo
  }

  type Query {
    # Find a document from the collection of 'User' by its id.
    findUserByID(
      # The 'User' document's ID
      id: ID!
    ): User
    # Find a document from the collection of 'Todo' by its id.
    findTodoByID(
      # The 'Todo' document's ID
      id: ID!
    ): Todo
    findUserByAuthId(authId: String!): User
  }

  scalar Time

  type Todo {
    # The document's ID.
    _id: ID!
    completed: Boolean!
    title: String!
    user: User!
    # The document's timestamp.
    _ts: Long!
  }

  # 'Todo' input values
  input TodoInput {
    title: String!
    completed: Boolean!
    user: TodoUserRelation
  }

  # The pagination object for elements of type 'Todo'.
  type TodoPage {
    # The elements of type 'Todo' in this page.
    data: [Todo]!
    # A cursor for elements coming after the current page.
    after: String
    # A cursor for elements coming before the current page.
    before: String
  }

  # Allow manipulating the relationship between the types 'Todo' and 'User' using the field 'Todo.user'.
  input TodoUserRelation {
    # Create a document of type 'User' and associate it with the current document.
    create: UserInput
    # Connect a document of type 'User' with the current document using its ID.
    connect: ID
  }

  type User {
    # The document's ID.
    _id: ID!
    # The document's timestamp.
    _ts: Long!
    authId: String!
    todos(
      # The number of items to return per page.
      _size: Int
      # The pagination cursor.
      _cursor: String
    ): TodoPage!
  }

  # 'User' input values
  input UserInput {
    authId: String!
    todos: UserTodosRelation
  }

  # Allow manipulating the relationship between the types 'User' and 'Todo'.
  input UserTodosRelation {
    # Create one or more documents of type 'Todo' and associate them with the current document.
    create: [TodoInput]
    # Connect one or more documents of type 'Todo' with the current document using their IDs.
    connect: [ID]
    # Disconnect the given documents of type 'Todo' from the current document using their IDs.
    disconnect: [ID]
  }
`
