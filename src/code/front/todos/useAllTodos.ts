import { useQuery } from '@apollo/client'
import { gqlq, IAllTodos } from '../../gql'
import { client } from '../apolloClient'
import { CTodo } from './Todo'

export const useAllTodos = (): {
  todos: CTodo[]
  isLoadingAllTodos: boolean
} => {
  const { error, loading, data } = useQuery<IAllTodos>(gqlq.query.allTodos, {
    client
  })

  if (error) console.log(error)
  return { todos: data?.allTodos?.data || [], isLoadingAllTodos: loading }
}
