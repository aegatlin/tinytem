import { IResolvers } from 'apollo-server-micro'
import { GraphQLClient } from 'graphql-request'

export const gqlClient = new GraphQLClient(
  'https://graphql.fauna.com/graphql',
  {
    headers: {
      Authorization: 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'
    }
  }
)

export const resolvers: IResolvers = {
  Query: {
    findUserByAuthId: async (_, { authId }) => {
      const query = `
        query FindUserByAuthId($authId: String!) {
          findUserByAuthId(authId: $authId) {
            _id
            authId
            todos {
              data {
                _id
                title
                completed
              }
            }
          }
        }
      `

      const variables = { authId }
      const { findUserByAuthId } = await gqlClient.request(query, variables)
      return findUserByAuthId
    },
    findUserByID: async (_, { id }) => {
      const query = `
        query FindUserByID($id: ID!) {
          findUserByID(id: $id) {
            _id
            authId
            todos {
              data {
                _id
                title
                completed
              }
            }
          }
        }
      `

      const variables = { id }
      const { findUserByID } = await gqlClient.request(query, variables)
      return findUserByID
    }
  },
  Mutation: {
    createTodo: async (_, { data }) => {
      const mutation = `
        mutation CreateTodo(
          $title: String!
          $userId: ID!
        ) {
          createTodo(
            data: {
              title: $title
              completed: false
              user: { connect: $userId }
            }
          ) {
            _id
            title
            completed
          }
        }
      `

      const { title, user } = data
      const variables = { title, userId: user.connect }
      const { createTodo } = await gqlClient.request(mutation, variables)
      return createTodo
    },
    deleteTodo: async (_, { id }) => {
      const mutation = `
        mutation DeleteTodo($_id: ID!) {
          deleteTodo(id: $_id) {
            _id
          }
        }
      `

      const variables = { _id: id }
      const { deleteTodo } = await gqlClient.request(mutation, variables)
      return deleteTodo
    },
    updateTodo: async (_, { id, data }) => {
      const mutation = `
        mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!) {
          updateTodo(id: $_id, data: { title: $title, completed: $completed }) {
            _id
            title
            completed
          }
        }
      `

      const { title, completed } = data
      const variables = { _id: id, title, completed }
      const { updateTodo } = await gqlClient.request(mutation, variables)
      return updateTodo
    }
  }
}
