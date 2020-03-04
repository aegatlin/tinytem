import { CTodo } from '../../types'

interface ITodo {
  todo: CTodo
  deleteTodo(): void
}

export const Todo2 = ({ todo, deleteTodo }: ITodo) => {
  return (
    <div>
      <span>{todo.title}</span>
      <span>
        <button onClick={deleteTodo}>X</button>
      </span>
    </div>
  )
}
