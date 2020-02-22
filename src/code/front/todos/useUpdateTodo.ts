import { MutationFunction, useMutation } from '@apollo/client'
import { client } from '../apolloClient'
import { gqlq } from '../../gqlq'
import { CTodo } from './Todo'

interface IUpdateTodo {
  updateTodo: CTodo
}

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
