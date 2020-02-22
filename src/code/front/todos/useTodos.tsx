import { CTodo, Todo } from './Todo'
import { useCreateTodo } from './useCreateTodo'
import { useDeleteTodo } from './useDeleteTodo'
import { useAllTodos } from './useAllTodos'
import { useUpdateTodo } from './useUpdateTodo'

export const useTodos = (): {
  todos: CTodo[]
  addTodo(eTodo: Exclude<CTodo, '_id'>): void
  todoMaker(todo: CTodo, key: number): JSX.Element
  isLoadingAllTodos: boolean
  isCreatingTodo: boolean
} => {
  const { todos, isLoadingAllTodos } = useAllTodos()
  const { createTodo, isCreatingTodo } = useCreateTodo()
  const { deleteTodo } = useDeleteTodo()
  const { updateTodo } = useUpdateTodo()

  const deleteTodoMaker = (todo: CTodo) => (): void => {
    deleteTodo({ variables: { _id: todo._id } })
  }

  const toggleCompletedMaker = (todo: CTodo) => (): void => {
    updateTodo({ variables: { ...todo, completed: !todo.completed } })
  }

  const updateTitleMaker = (todo: CTodo) => (newTitle: string): void => {
    updateTodo({ variables: { ...todo, title: newTitle } })
  }

  return {
    todos,
    addTodo: ({ title, completed }): void => {
      createTodo({ variables: { title, completed } })
    },
    todoMaker: (todo): JSX.Element => {
      const props = {
        todo,
        deleteTodo: deleteTodoMaker(todo),
        toggleCompleted: toggleCompletedMaker(todo),
        updateTitle: updateTitleMaker(todo)
      }

      return <Todo key={todo._id} {...props} />
    },
    isLoadingAllTodos,
    isCreatingTodo
  }
}
