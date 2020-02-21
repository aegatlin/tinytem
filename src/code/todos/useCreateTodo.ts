import { MutationFunction, useMutation } from '@apollo/client'
import { client } from '../apolloClient'
import { gqlq } from '../gqlq'
import { CTodo } from './Todo'

interface ICreateTodo {
  createTodo: CTodo
}

interface ICreateTodoVars {
  title: string
  completed: boolean
}

export const useCreateTodo = (): {
  createTodo: MutationFunction<ICreateTodo, ICreateTodoVars>
  isCreatingTodo: boolean
} => {
  const [createTodo, { error, loading }] = useMutation<
    ICreateTodo,
    ICreateTodoVars
  >(gqlq.mutations.createTodo, {
    client,
    update: (cache, { data: { createTodo: newTodo } }) => {
      const {
        allTodos: { data: todos }
      } = cache.readQuery({ query: gqlq.queries.getAllTodos })
      cache.writeQuery({
        query: gqlq.queries.getAllTodos,
        data: { allTodos: { data: todos.concat(newTodo) } }
      })
    }
  })

  if (error) console.log(error)
  return { createTodo, isCreatingTodo: loading }
}
