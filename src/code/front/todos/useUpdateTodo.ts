import { gql, useMutation } from '@apollo/client'
import { CTodo } from '../../types'

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`

interface IUpdateTodo {
  updateTodo: CTodo
}

interface IUpdateTodoVars {
  id: string
  title: string
  completed: boolean
}

export const useUpdateTodo = (todo: CTodo) => {
  const [updateTodoMutationFunction] = useMutation<
    IUpdateTodo,
    IUpdateTodoVars
  >(UPDATE_TODO)

  const toggleCompleted = () => {
    updateTodoMutationFunction({
      variables: { id: todo._id, title: todo.title, completed: !todo.completed }
    })
  }

  return { toggleCompleted }
}
