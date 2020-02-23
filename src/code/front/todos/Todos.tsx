import { style } from 'typestyle'
import { useAuth0 } from '../auth0'
import { AddTodoFormUI } from './AddTodoForm'
import { useTodos } from './useTodos'
import { useToken } from '../TokenProvider'

const todosClass = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px'
})

const TodoList = () => {
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

export const Todos = (): JSX.Element => {
  const { isAuthenticated, loading } = useAuth0()
  const { token } = useToken()

  const isReady = isAuthenticated && !loading
  if (!isReady) return <div>Please log in to see your todos</div>

  const isReadyWithToken = isReady && !!token
  if (!isReadyWithToken) return <div>Login in successful. Loading...</div>

  return <TodoList />
}
