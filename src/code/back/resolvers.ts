import { IResolvers } from 'apollo-server-micro'
import { gqlq, IAllTodos, ICreateTodo, IDeleteTodo, IUpdateTodo } from '../gql'
import { gqlClient } from './gqlClient'

export const resolvers: IResolvers = {
  Query: {
    allTodos: async () => {
      const res = await gqlClient.request<IAllTodos>(gqlq.query.allTodosQ)
      return res.allTodos
    }
  },
  Mutation: {
    createTodo: async (_, { data }) => {
      const { title, completed } = data
      const r = await gqlClient.request<ICreateTodo>(
        gqlq.mutation.createTodoQ,
        { title, completed }
      )
      return r.createTodo
    },
    deleteTodo: async (_, { id }) => {
      const r = await gqlClient.request<IDeleteTodo>(
        gqlq.mutation.deleteTodoQ,
        { _id: id }
      )
      return r.deleteTodo
    },
    updateTodo: async (_, { id, data }) => {
      const { title, completed } = data
      const r = await gqlClient.request<IUpdateTodo>(
        gqlq.mutation.updateTodoQ,
        { _id: id, title, completed }
      )
      return r.updateTodo
    }
  }
}
