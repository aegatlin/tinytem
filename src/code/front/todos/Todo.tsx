import { CTodo } from '../../types'
import { useDeleteTodo } from './useDeleteTodo'
import { useUpdateTodo } from './useUpdateTodo'

interface ITodo {
  todo: CTodo
}

export const Todo = ({ todo }: ITodo) => {
  const { deleteTodo } = useDeleteTodo(todo)
  const { toggleCompleted } = useUpdateTodo(todo)

  return (
    <div>
      <button onClick={toggleCompleted}>✓</button>
      <span>{todo.title}</span>
      <span>
        <button onClick={deleteTodo}>X</button>
      </span>
    </div>
  )
}
