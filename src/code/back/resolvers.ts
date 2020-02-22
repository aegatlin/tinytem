import { IResolvers } from 'apollo-server-micro'
import { AllTodos, CreateTodo, DeleteTodo, UpdateTodo } from '../namespacer'

export const resolvers: IResolvers = {
  Query: {
    allTodos: AllTodos.resolver
  },
  Mutation: {
    createTodo: CreateTodo.resolver,
    deleteTodo: DeleteTodo.resolver,
    updateTodo: UpdateTodo.resolver
  }
}
