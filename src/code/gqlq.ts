import { gql } from '@apollo/client'

export const gqlq = {
  query: {
    allTodos: gql`
      query {
        allTodos {
          data {
            _id
            title
            completed
          }
        }
      }
    `
  },
  mutation: {
    createTodo: gql`
      mutation CreateTodo($title: String!, $completed: Boolean!) {
        createTodo(data: { title: $title, completed: $completed }) {
          _id
          title
          completed
        }
      }
    `,
    deleteTodo: gql`
      mutation DeleteTodo($_id: ID!) {
        deleteTodo(id: $_id) {
          _id
        }
      }
    `,
    updateTodo: gql`
      mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!) {
        updateTodo(id: $_id, data: { title: $title, completed: $completed }) {
          _id
          title
          completed
        }
      }
    `
  }
}
