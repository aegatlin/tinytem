import { CTodo, Todo } from './Todo'
import { useCreateTodo } from './useCreateTodo'
import { useDeleteTodo } from './useDeleteTodo'
import { useGetAllTodos } from './useGetAllTodos'
import { useUpdateTodo } from './useUpdateTodo'

export const useTodos = () => {
  const { todos } = useGetAllTodos()
  const { createTodo } = useCreateTodo()
  const { deleteTodo } = useDeleteTodo()
  const { updateTodo } = useUpdateTodo()

  const deleteTodoMaker = (todo: CTodo) => (): void => {
    deleteTodo({ variables: { _id: todo._id } })
  }

  const toggleCompletedMaker = (todo: CTodo) => (): void => {
    updateTodo({ variables: { ...todo, completed: !todo.completed } })
  }

  return {
    todos,
    addTodo: ({ title, completed }: Exclude<CTodo, '_id'>): void => {
      createTodo({ variables: { title, completed } })
    },
    todoMaker: (todo: CTodo, key: number) => {
      const props = {
        todo,
        deleteTodo: deleteTodoMaker(todo),
        toggleCompleted: toggleCompletedMaker(todo)
      }

      return <Todo key={key} {...props} />
    }
  }
}
