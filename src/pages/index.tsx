import { Todo, TodoUI } from '../code/Todo'
import { Layout } from '../code/Layout'

const todos: Todo[] = [
  { title: 'Read a book', completed: false },
  { title: 'Eat a pizza', completed: true }
]

export default () => {
  return (
    <Layout>
      <h2>Todo List</h2>
      {todos.map((todo, i) => (
        <TodoUI key={i} todo={todo} />
      ))}
    </Layout>
  )
}
