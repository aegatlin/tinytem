import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { IResolvers } from 'apollo-server-micro'
import {
  gqlq,
  IAllTodos,
  ICreateTodo,
  ICreateTodoVars,
  IDeleteTodo,
  IDeleteTodoVars,
  IUpdateTodo
} from '../gql'

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

export const resolvers: IResolvers = {
  Query: {
    allTodos: async () => {
      const res = await client.query<IAllTodos>({
        query: gqlq.query.allTodos
      })
      return res.data.allTodos
    }
  },
  Mutation: {
    createTodo: async (_, { data }) => {
      const { title, completed } = data
      const res = await client.mutate<ICreateTodo, ICreateTodoVars>({
        mutation: gqlq.mutation.createTodo,
        variables: { title, completed }
      })
      return res.data.createTodo
    },
    deleteTodo: async (_, { id }) => {
      const res = await client.mutate<IDeleteTodo, IDeleteTodoVars>({
        mutation: gqlq.mutation.deleteTodo,
        variables: { _id: id }
      })
      return res.data.deleteTodo
    },
    updateTodo: async (_, { id, data }) => {
      const { title, completed } = data
      const res = await client.mutate<IUpdateTodo>({
        mutation: gqlq.mutation.updateTodo,
        variables: { _id: id, title, completed }
      })
      return res.data.updateTodo
    }
  }
}
