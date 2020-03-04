import { gql, useMutation } from '@apollo/client'
import { style } from 'typestyle'
import { useUser } from '../Layout/UserProvider'
import { CreateTodoForm } from './CreateTodoForm'
import { Todo2 } from './Todo2'
import {
  useFindTodos,
  FIND_TODOS_BY_USER_ID,
  IFindTodosQuery as IFindTodos,
  IFindTodosVars
} from './useFindTodos'
import { CTodo } from '../../types'

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $userId: ID!) {
    createTodo(
      data: { title: $title, completed: false, user: { connect: $userId } }
    ) {
      _id
      title
      completed
    }
  }
`

interface ICreateTodo {
  createTodo: CTodo
}

interface ICreateTodoVars {
  title: string
  userId: string
}

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`

const todosClass = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px'
})

interface IDeleteTodo {
  deleteTodo: {
    _id: string
  }
}

interface IDeleteTodoVars {
  id: string
}

export const Todos = () => {
  const { user } = useUser()
  const { todos, loadingTodos } = useFindTodos()
  const [createTodo, { data: createTodoData }] = useMutation<
    ICreateTodo,
    ICreateTodoVars
  >(CREATE_TODO, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id }
      })
      const oldTodos = cachedData.findUserByID.todos.data
      const newTodo = data.createTodo
      cache.writeQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id },
        data: { findUserByID: { todos: { data: oldTodos.concat(newTodo) } } }
      })
    }
  })

  const [deleteTodoMutationFunction, { data: deleteTodoData }] = useMutation<
    IDeleteTodo,
    IDeleteTodoVars
  >(DELETE_TODO, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id }
      })
      const oldTodos = cachedData.findUserByID.todos.data
      const deletedTodoId = data.deleteTodo._id
      const newTodos = oldTodos.filter(t => t._id !== deletedTodoId)
      cache.writeQuery<IFindTodos, IFindTodosVars>({
        query: FIND_TODOS_BY_USER_ID,
        variables: { id: user._id },
        data: { findUserByID: { todos: { data: newTodos } } }
      })
    }
  })

  const isCreatingTodo = false

  const todosWithCompletedAs = (b: boolean): JSX.Element[] =>
    todos
      .filter(todo => todo.completed === b)
      .map(todo => {
        const deleteTodo = () => {
          deleteTodoMutationFunction({
            variables: { id: todo._id }
          })
        }
        return <Todo2 key={todo._id} todo={todo} deleteTodo={deleteTodo} />
      })

  return (
    <div className={todosClass}>
      <h2>My Todos</h2>
      <CreateTodoForm createTodo={createTodo} isCreatingTodo={isCreatingTodo} />
      <h3>Todo list</h3>
      {todosWithCompletedAs(false)}
      <h3>Completed todos</h3>
      {todosWithCompletedAs(true)}
    </div>
  )
}
