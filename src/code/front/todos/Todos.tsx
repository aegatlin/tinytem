import { style } from 'typestyle'
import { CreateTodoForm } from './CreateTodoForm'
import { Todo } from './Todo'
import { useFindTodos } from './useFindTodos'

const todosClass = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px'
})

export const Todos = () => {
  const { todos } = useFindTodos()

  const todosWithCompletedAs = (b: boolean): JSX.Element[] =>
    todos
      .filter(todo => todo.completed === b)
      .map(todo => {
        return <Todo key={todo._id} todo={todo} />
      })

  return (
    <div className={todosClass}>
      <h2>My Todos</h2>
      <CreateTodoForm />
      <h3>Todo list</h3>
      {todosWithCompletedAs(false)}
      <h3>Completed todos</h3>
      {todosWithCompletedAs(true)}
    </div>
  )
}
