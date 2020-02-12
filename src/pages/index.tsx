import { gql, useQuery, useMutation } from '@apollo/client'
import { client, Layout } from '../code/Layout'
import { TodoUI } from '../code/Todo'
import { useState, useEffect } from 'react'

const TODOS = gql`
  {
    allTodos {
      data {
        title
        completed
      }
    }
  }
`

const CREATE_TODO = gql`
  mutation {
    createTodo(data: { title: "Eat Chocolate", completed: false }) {
      title
      completed
    }
  }
`

export default () => {
  const { loading, error, data, refetch } = useQuery(TODOS, { client })
  const [createTodo, result] = useMutation(CREATE_TODO, { client })
  const [todos, setTodos] = useState([])
  useEffect(() => {
    if (data) {
      setTodos(data.allTodos.data)
    }
  }, [data])

  const addTodoHandler = () => {
    createTodo()

    if (result.data) {
      let newTodo = result.data.createTodo
      newTodo.title = newTodo.title + 'you been hacked'
      setTodos(todos.concat([newTodo]))
    }

    setTimeout(() => refetch(), 3000)
  }

  if (loading) return <Layout>Loading...</Layout>
  if (error) return <Layout>Error</Layout>

  return (
    <Layout>
      <h2>Todo List</h2>
      <div>
        <label htmlFor="add-todo">Add Todo: </label>
        <input type="text" name="add-todo" id="add-todo" />
        <button onClick={addTodoHandler}>Submit</button>
      </div>
      <div>
        {todos.map((todo, i) => (
          <TodoUI key={i} todo={todo} />
        ))}
      </div>
    </Layout>
  )
}
