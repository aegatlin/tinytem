import { MutationFunction, useMutation } from '@apollo/client'
import { gqlq, IUpdateTodo } from '../../gql'
import { client } from '../apolloClient'
import { CTodo } from './Todo'

export const useUpdateTodo = (): {
  updateTodo: MutationFunction<IUpdateTodo, CTodo>
} => {
  const [updateTodo, { error }] = useMutation<IUpdateTodo, CTodo>(
    gqlq.mutation.updateTodo,
    {
      client
    }
  )

  if (error) console.log(error)
  return { updateTodo }
}
