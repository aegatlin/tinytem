import { useState } from 'react'
import { style } from 'typestyle'
import { AddTodoFormUI } from './AddTodoForm'
import { Todo } from './Todo'

const todosClass = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px'
})

export class CTodo {
  id: string
  title: string
  completed: boolean
}

export const getRandString = () => `${Math.random()}`

const initialTodos: CTodo[] = [
  { id: getRandString(), title: 'Eat pizza', completed: true },
  { id: getRandString(), title: 'Write code', completed: false },
  { id: getRandString(), title: 'Be better', completed: false }
]

export const TodosUI = () => {
  const [todos, setTodos] = useState(initialTodos)
  const addTodo = (newTodo: CTodo) => setTodos(todos.concat([newTodo]))
  const deleteTodo = (id: string) =>
    setTodos(todos.filter(todo => todo.id !== id))
  const updateTodo = (newTodo: CTodo) =>
    setTodos(
      todos.map(todo => {
        if (todo.id === newTodo.id) return newTodo
        return todo
      })
    )

  const todosWithCompleted = (b: boolean) =>
    todos
      .filter(todo => todo.completed === b)
      .map((todo, i) => {
        const props = {
          todo,
          deleteTodo: () => deleteTodo(todo.id),
          toggleCompleted: () =>
            updateTodo({ ...todo, completed: !todo.completed })
        }
        return <Todo key={i} {...props} />
      })

  return (
    <div className={todosClass}>
      <h2>My Todos</h2>
      <AddTodoFormUI addTodo={addTodo} />
      <h3>Todo list</h3>
      {todosWithCompleted(false)}
      <h3>Completed todos</h3>
      {todosWithCompleted(true)}
    </div>
  )
}
