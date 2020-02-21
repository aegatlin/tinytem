import { MutationFunction, useMutation } from '@apollo/client'
import { client } from '../apolloClient'
import { gqlq } from '../gqlq'
import { CTodo } from './Todo'

interface IDeleteTodo {
  deleteTodo: {
    _id: string
  }
}

interface IDeleteTodoVars {
  _id: string
}

export const useDeleteTodo = (): {
  deleteTodo: MutationFunction<IDeleteTodo, IDeleteTodoVars>
} => {
  const [deleteTodo, { error }] = useMutation<IDeleteTodo, IDeleteTodoVars>(
    gqlq.mutations.deleteTodo,
    {
      client,
      update: (cache, { data }) => {
        const _id = data.deleteTodo._id
        const { allTodos } = cache.readQuery({
          query: gqlq.queries.getAllTodos
        })
        const todos = allTodos?.data

        cache.writeQuery({
          query: gqlq.queries.getAllTodos,
          data: {
            allTodos: { data: todos.filter((t: CTodo) => t._id !== _id) }
          }
        })
      }
    }
  )

  if (error) console.log(error)
  return { deleteTodo }
}
