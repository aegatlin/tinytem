import { gql, useMutation } from '@apollo/client'
import { CTodo } from './Todo'
import { GET_ALL_TODOS } from './useGetAllTodos'
import { client } from './apolloClient'

interface IDeleteTodo {
  deleteTodo: {
    _id: string
  }
}

interface IDeleteTodoVars {
  _id: string
}

const DELETE_TODO = gql`
  mutation DeleteTodo($_id: ID!) {
    deleteTodo(id: $_id) {
      _id
    }
  }
`

export const useDeleteTodo = () => {
  const [deleteTodo, { error }] = useMutation<IDeleteTodo, IDeleteTodoVars>(
    DELETE_TODO,
    {
      client,
      update: (cache, { data }) => {
        const _id = data.deleteTodo._id
        const {
          allTodos: { data: todos }
        } = cache.readQuery({ query: GET_ALL_TODOS })

        cache.writeQuery({
          query: GET_ALL_TODOS,
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
