export class Todo {
  title: string
  completed: boolean
}

interface ITodo {
  todo: Todo
}

export const TodoUI = ({ todo }: ITodo) => {
  const { title, completed } = todo
  return (
    <div>
      {title} | {completed ? 'completed' : 'incomplete'}
    </div>
  )
}
