import { useQuery } from '@apollo/client'
import { client } from '../apolloClient'
import { gqlq } from '../../gqlq'
import { CTodo } from './Todo'

interface IAllTodos {
  allTodos: {
    data: CTodo[]
  }
}

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
