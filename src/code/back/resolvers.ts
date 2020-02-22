import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { gqlq } from '../gqlq'

const FAUNA_DB_URI = 'https://graphql.fauna.com/graphql'
const AUTH = 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: FAUNA_DB_URI,
    headers: {
      Authorization: AUTH
    }
  })
})

export const resolvers = {
  Query: {
    allTodos: async () => {
      const res = await client.query({ query: gqlq.query.allTodos })
      return res.data.allTodos
    }
  },
  Mutation: {
    createTodo: async (_, args) => {
      const { title, completed } = args.data
      const res = await client.mutate({
        mutation: gqlq.mutation.createTodo,
        variables: { title, completed }
      })
      return res.data.createTodo
    },
    deleteTodo: async (_, args) => {
      const { id } = args
      const res = await client.mutate({
        mutation: gqlq.mutation.deleteTodo,
        variables: { _id: id }
      })
      return res.data.deleteTodo
    },
    updateTodo: async (_, args) => {
      const { id, data } = args
      const { title, completed } = data
      const res = await client.mutate({
        mutation: gqlq.mutation.updateTodo,
        variables: { _id: id, title, completed }
      })
      return res.data.updateTodo
    }
  }
}
