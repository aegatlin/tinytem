import { MutationFunction, useMutation } from '@apollo/client'
import { gqlq, IDeleteTodo, IDeleteTodoVars } from '../../gql'
import { client } from '../apolloClient'
import { CTodo } from './Todo'

export const useDeleteTodo = (): {
  deleteTodo: MutationFunction<IDeleteTodo, IDeleteTodoVars>
} => {
  const [deleteTodo, { error }] = useMutation<IDeleteTodo, IDeleteTodoVars>(
    gqlq.mutation.deleteTodo,
    {
      client,
      update: (cache, { data }) => {
        const _id = data.deleteTodo._id
        const { allTodos } = cache.readQuery({
          query: gqlq.query.allTodos
        })
        const todos = allTodos?.data

        cache.writeQuery({
          query: gqlq.query.allTodos,
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
