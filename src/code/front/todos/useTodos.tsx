// import { CTodo } from '../../CTodo'
// import { AllTodos, CreateTodo, DeleteTodo, UpdateTodo } from '../../namespacer'
// import { Todo } from './Todo'

// export const useTodos = (): {
//   todos: CTodo[]
//   addTodo(todo: Exclude<CTodo, '_id'>): void
//   todoMaker(todo: CTodo): JSX.Element
//   isLoadingAllTodos: boolean
//   isCreatingTodo: boolean
// } => {
//   const { todos, isLoadingAllTodos } = AllTodos.useAllTodos()
//   const { createTodoMaker, isCreatingTodo } = CreateTodo.useCreateTodo()
//   const { deleteTodoMaker } = DeleteTodo.useDeleteTodo()
//   const { toggleCompletedMaker, updateTitleMaker } = UpdateTodo.useUpdateTodo()

//   return {
//     todos,
//     addTodo: createTodoMaker,
//     todoMaker: (todo): JSX.Element => {
//       const props = {
//         todo,
//         deleteTodo: deleteTodoMaker(todo),
//         toggleCompleted: toggleCompletedMaker(todo),
//         updateTitle: updateTitleMaker(todo)
//       }

//       return <Todo key={todo._id} {...props} />
//     },
//     isLoadingAllTodos,
//     isCreatingTodo
//   }
// }
