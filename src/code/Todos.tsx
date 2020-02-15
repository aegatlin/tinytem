import { style } from 'typestyle'
import { AddTodoFormUI } from './AddTodoForm'
import { useTodos } from './useTodos'

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

export const TodosUI = () => {
  const { todos, todoMaker, addTodo } = useTodos()
  const todosWithCompleted = (b: boolean) =>
    todos.filter(todo => todo.completed === b).map(todoMaker)

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
