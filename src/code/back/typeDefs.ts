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
    # Update an existing document in the collection of 'Todo'
    updateTodo(
      # The 'Todo' document's ID
      id: ID!
      # 'Todo' input values
      data: TodoInput!
    ): Todo
    # Delete an existing document in the collection of 'Todo'
    deleteTodo(
      # The 'Todo' document's ID
      id: ID!
    ): Todo
  }

  type Query {
    # Find a document from the collection of 'Todo' by its id.
    findTodoByID(
      # The 'Todo' document's ID
      id: ID!
    ): Todo
    allTodos(
      # The number of items to return per page.
      _size: Int
      # The pagination cursor.
      _cursor: String
    ): TodoPage!
  }

  scalar Time

  type Todo {
    # The document's ID.
    _id: ID!
    # The document's timestamp.
    _ts: Long!
    title: String!
    completed: Boolean!
  }

  # 'Todo' input values
  input TodoInput {
    title: String!
    completed: Boolean!
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
`
