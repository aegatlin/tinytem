import { gql, useMutation } from '@apollo/client'
import { CTodo } from '../../types'
import {
  FIND_TODOS_BY_USER_ID,
  IFindTodos,
  IFindTodosVars
} from './useFindTodos'
import { useUser } from '../Layout/UserProvider'

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $userId: ID!) {
    createTodo(
      data: { title: $title, completed: false, user: { connect: $userId } }
    ) {
      _id
      title
      completed
    }
  }
`

interface ICreateTodo {
  createTodo: CTodo
}

interface ICreateTodoVars {
  title: string
  userId: string
}

export const useCreateTodo = () => {
  const { user } = useUser()
  const [createTodoMutationFunction, { error, loading }] = useMutation<
    ICreateTodo,
    ICreateTodoVars
  >(CREATE_TODO, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id }
      })
      const oldTodos = cachedData.findUserByID.todos.data
      const newTodo = data.createTodo
      cache.writeQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id },
        data: { findUserByID: { todos: { data: oldTodos.concat(newTodo) } } }
      })
    }
  })

  if (error) console.error(error)

  const createTodo = ({ title }) => {
    createTodoMutationFunction({
      variables: { title, userId: user._id }
    })
  }

  return { createTodo, isCreating: loading }
}
