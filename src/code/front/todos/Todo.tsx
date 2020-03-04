import { CTodo } from '../../types'
import { useDeleteTodo } from './useDeleteTodo'

interface ITodo {
  todo: CTodo
}

export const Todo = ({ todo }: ITodo) => {
  const { deleteTodo } = useDeleteTodo(todo)

  return (
    <div>
      <span>{todo.title}</span>
      <span>
        <button onClick={deleteTodo}>X</button>
      </span>
    </div>
  )
}
