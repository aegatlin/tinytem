import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { apolloClient, Layout } from '../code/Layout'
import { Todo, TodoUI } from '../code/Todo'
import { TodoForm } from '../code/TodoForm'

const ALL_TODOS = gql`
  {
    allTodos {
      data {
        _id
        title
        completed
      }
    }
  }
`

export default () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const onCompleted: (data: any) => void = data => {
    const todos = data.allTodos.data.map(({ _id, title, completed }) => {
      return {
        id: _id,
        title,
        completed
      }
    })

    console.log('fetch ', todos)

    setTodos(todos)
  }

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    console.log('delete ', newTodos)
    setTodos(newTodos)
  }

  const { loading, error } = useQuery(ALL_TODOS, {
    client: apolloClient,
    onCompleted
  })

  if (loading) return <Layout>Loading...</Layout>
  if (error) return <Layout>Error</Layout>

  const addTodo = (todo: Todo): void => setTodos(todos.concat([todo]))

  return (
    <Layout>
      <TodoForm addTodo={addTodo} />
      <h2>Todo List</h2>
      <div>
        {todos.map((todo, i) => (
          <TodoUI key={i} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </Layout>
  )
}
