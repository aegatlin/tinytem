import { style } from 'typestyle'
import { AddTodoFormUI } from './AddTodoForm'
import { useTodos } from './useTodos'

const todosClass = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px'
})

export const Todos = (): JSX.Element => {
  const {
    todos,
    todoMaker,
    addTodo,
    isLoadingAllTodos,
    isCreatingTodo
  } = useTodos()

  const todosWithCompleted = (b: boolean): JSX.Element[] =>
    todos.filter(todo => todo.completed === b).map(todoMaker)

  return (
    <div className={todosClass}>
      <h2>My Todos</h2>
      <AddTodoFormUI addTodo={addTodo} isCreatingTodo={isCreatingTodo} />
      <h3>Todo list</h3>
      {isLoadingAllTodos && <div>Loading Todos...</div>}
      {todosWithCompleted(false)}
      <h3>Completed todos</h3>
      {isLoadingAllTodos && <div>Loading Todos...</div>}
      {todosWithCompleted(true)}
    </div>
  )
}
