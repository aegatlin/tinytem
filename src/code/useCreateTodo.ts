import { gql, useMutation } from '@apollo/client'
import { client } from './apolloClient'
import { CTodo } from './Todo'
import { GET_ALL_TODOS } from './useGetAllTodos'

interface ICreateTodo {
  createTodo: CTodo
}

interface ICreateTodoVars {
  title: string
  completed: boolean
}

const CREATE_TODO = gql`
  mutation AddTodo($title: String!, $completed: Boolean!) {
    createTodo(data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`

export const useCreateTodo = () => {
  const [createTodo, { error }] = useMutation<ICreateTodo, ICreateTodoVars>(
    CREATE_TODO,
    {
      client,
      update: (cache, { data: { createTodo: newTodo } }) => {
        const {
          allTodos: { data: todos }
        } = cache.readQuery({ query: GET_ALL_TODOS })
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { allTodos: { data: todos.concat(newTodo) } }
        })
      }
    }
  )

  if (error) console.log(error)
  return { createTodo }
}
