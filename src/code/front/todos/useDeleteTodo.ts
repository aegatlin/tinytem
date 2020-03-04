import { gql, useMutation } from '@apollo/client'
import {
  FIND_TODOS_BY_USER_ID,
  IFindTodos,
  IFindTodosVars
} from './useFindTodos'
import { useUser } from '../Layout/UserProvider'
import { CTodo } from '../../types'

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`

interface IDeleteTodo {
  deleteTodo: {
    _id: string
  }
}

interface IDeleteTodoVars {
  id: string
}

export const useDeleteTodo = (todo: CTodo) => {
  const { user } = useUser()
  const [deleteTodoMutationFunction, { loading, error }] = useMutation<
    IDeleteTodo,
    IDeleteTodoVars
  >(DELETE_TODO, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id }
      })
      const oldTodos = cachedData.findUserByID.todos.data
      const deletedTodoId = data.deleteTodo._id
      const newTodos = oldTodos.filter(t => t._id !== deletedTodoId)
      cache.writeQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id },
        data: { findUserByID: { todos: { data: newTodos } } }
      })
    }
  })

  if (error) console.error(error)

  const deleteTodo = () => {
    deleteTodoMutationFunction({ variables: { id: todo._id } })
  }

  return { deleteTodo, isDeleting: loading }
}
