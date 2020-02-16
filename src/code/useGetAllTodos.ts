import { gql, useQuery } from '@apollo/client'
import { client } from './apolloClient'
import { CTodo } from './Todo'

interface IGetAllTodos {
  allTodos: {
    data: CTodo[]
  }
}

export const GET_ALL_TODOS = gql`
  query {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }
`

export const useGetAllTodos = (): { todos: CTodo[] } => {
  const { error, data } = useQuery<IGetAllTodos>(GET_ALL_TODOS, { client })

  if (error) console.log(error)
  return { todos: data?.allTodos?.data || [] }
}
