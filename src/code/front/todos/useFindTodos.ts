import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CTodo } from '../../types'
import { useUser } from '../Layout/UserProvider'

export const FIND_TODOS_BY_USER_ID = gql`
  query FindTodosByUserId($id: ID!) {
    findUserByID(id: $id) {
      todos {
        data {
          _id
          title
          completed
        }
      }
    }
  }
`

export interface IFindTodos {
  findUserByID: {
    todos: {
      data: CTodo[]
    }
  }
}

export interface IFindTodosVars {
  id: string
}

export const useFindTodos = (): { todos: CTodo[]; loadingTodos: boolean } => {
  const { user } = useUser()
  const { data, error, loading } = useQuery<IFindTodos, IFindTodosVars>(
    FIND_TODOS_BY_USER_ID,
    {
      variables: { id: user._id }
    }
  )

  const [todos, setTodos] = useState([])

  if (error) console.error(error)

  useEffect(() => {
    if (data && !error && !loading) {
      setTodos(data.findUserByID.todos.data)
    }
  }, [data, loading])

  return { todos, loadingTodos: loading }
}
