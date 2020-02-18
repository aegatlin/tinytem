import { gql, MutationFunction, useMutation } from '@apollo/client'
import { client } from '../apolloClient'
import { CTodo } from './Todo'

interface IUpdateTodo {
  updateTodo: CTodo
}

const UPDATE_TODO = gql`
  mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $_id, data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`

export const useUpdateTodo = (): {
  updateTodo: MutationFunction<IUpdateTodo, CTodo>
} => {
  const [updateTodo, { error }] = useMutation<IUpdateTodo, CTodo>(UPDATE_TODO, {
    client
  })

  if (error) console.log(error)
  return { updateTodo }
}
