import { CTodo } from '../../types'
import { useDeleteTodo } from './useDeleteTodo'
import { useUpdateTodo } from './useUpdateTodo'

interface ITodo {
  todo: CTodo
}

export const Todo = ({ todo }: ITodo) => {
  const { deleteTodo, isDeleting } = useDeleteTodo(todo)
  const { toggleCompleted, isUpdating } = useUpdateTodo(todo)
  const isLoading = isDeleting || isUpdating

  return (
    <div>
      <button onClick={toggleCompleted}>✓</button>
      <span>{isLoading ? 'Loading...' : todo.title}</span>
      <span>
        <button onClick={deleteTodo}>X</button>
      </span>
    </div>
  )
}
