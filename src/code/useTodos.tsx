import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  useMutation,
  useQuery
} from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import { useEffect, useState } from 'react'
import { Todo } from './Todo'
import { CTodo } from './Todos'

const FAUNA_DB_URI = 'https://graphql.fauna.com/graphql'
const AUTH = 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: FAUNA_DB_URI,
    headers: {
      Authorization: AUTH
    }
  })
})

const useCreateTodo = (todos, setTodos) => {
  const CREATE_TODO = gql`
    mutation AddTodo($title: String!, $completed: Boolean!) {
      createTodo(data: { title: $title, completed: $completed }) {
        _id
        title
        completed
      }
    }
  `

  const [createTodo, { error, loading, data, called }] = useMutation(
    CREATE_TODO,
    {
      client
    }
  )
  console.log(called)

  if (error) console.log(error)

  useEffect(() => {
    if (!error && !loading && data) {
      const { _id, title, completed } = data.createTodo
      setTodos(todos.concat([{ id: _id, title, completed }]))
    }
  }, [error, loading, data])

  const addTodo = (newTodo: CTodo) => {
    createTodo({
      variables: { title: newTodo.title, completed: newTodo.completed }
    })
  }

  return { addTodo }
}

const useGetAllTodos = setTodos => {
  const ALL_TODOS = gql`
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

  const { loading, error, data } = useQuery(ALL_TODOS, { client })

  if (error) console.log(error)

  useEffect(() => {
    if (!error && !loading && data) {
      const newTodos = data.allTodos.data.map(t => ({
        id: t._id,
        title: t.title,
        completed: t.completed
      }))
      setTodos(newTodos)
    }
  }, [error, loading, data])
}

const useDeleteTodo = (todos, setTodos) => {
  const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
      deleteTodo(id: $id) {
        _id
      }
    }
  `

  const [deleteTodo, { loading, error, data }] = useMutation(DELETE_TODO, {
    client
  })

  if (error) console.log(error)

  useEffect(() => {
    if (!error && !loading && data) {
      setTodos(
        todos.filter(t => t.id !== data.deleteTodo._id).map(tds => ({ ...tds }))
      )
    }
  }, [loading, error, data])

  return {
    deleteTodoMaker: (todo: CTodo) => () =>
      deleteTodo({ variables: { id: todo.id } })
  }
}

const useUpdateTodo = (todos, setTodos) => {
  const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
      updateTodo(id: $id, data: { title: $title, completed: $completed }) {
        _id
        title
        completed
      }
    }
  `

  const [updateTodo, { loading, error, data }] = useMutation(UPDATE_TODO, {
    client
  })

  if (error) console.log(error)

  useEffect(() => {
    if (!loading && !error && data) {
      const { _id, title, completed } = data.updateTodo
      setTodos(
        todos.map(t =>
          t.id !== _id ? { ...t } : { id: _id, title, completed }
        )
      )
    }
  }, [loading, error, data])

  return {
    toggleCompletedMaker: ({ id, title, completed }: CTodo) => () => {
      updateTodo({ variables: { id, title, completed: !completed } })
    }
  }
}

export const useTodos = () => {
  const [todos, setTodos] = useState<CTodo[]>([])
  useGetAllTodos(setTodos)
  const { addTodo } = useCreateTodo(todos, setTodos)
  const { deleteTodoMaker } = useDeleteTodo(todos, setTodos)
  const { toggleCompletedMaker } = useUpdateTodo(todos, setTodos)

  return {
    todos,
    addTodo,
    todoMaker: (todo: CTodo, key: number) => {
      const props = {
        todo,
        deleteTodo: deleteTodoMaker(todo),
        toggleCompleted: toggleCompletedMaker(todo)
      }

      return <Todo key={key} {...props} />
    }
  }
}
