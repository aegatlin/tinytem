import { useQuery } from '@apollo/client'
import { client } from '../apolloClient'
import { gqlq } from '../gqlq'
import { CTodo } from './Todo'

interface IGetAllTodos {
  allTodos: {
    data: CTodo[]
  }
}

export const useGetAllTodos = (): {
  todos: CTodo[]
  isLoadingAllTodos: boolean
} => {
  const { error, loading, data } = useQuery<IGetAllTodos>(
    gqlq.queries.getAllTodos,
    {
      client
    }
  )

  if (error) console.log(error)
  return { todos: data?.allTodos?.data || [], isLoadingAllTodos: loading }
}
