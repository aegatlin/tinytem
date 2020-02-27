import { style } from 'typestyle'
import { CreateTodoForm } from './CreateTodoForm'
import { useUser } from '../Layout/UserProvider'
import { useMutation, gql } from '@apollo/client'
import { CTodo } from '../../types'

const todosClass = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px'
})

const createTodoQ = gql`
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

const Todo2 = ({ todo }: { todo: CTodo }) => {
  return <div>{todo.title}</div>
}

export const Todos = () => {
  const { user } = useUser()
  const [createTodo, { data }] = useMutation(createTodoQ)

  console.log('data ', data)
  console.log(user)

  const todos = user.todos.data
  console.log('todos', todos)
  const isCreatingTodo = false

  const todosWithCompleted = (b: boolean): JSX.Element[] =>
    todos
      .filter(todo => todo.completed === b)
      .map(todo => <Todo2 key={todo._id} todo={todo} />)

  return (
    <div className={todosClass}>
      <h2>My Todos</h2>
      <CreateTodoForm createTodo={createTodo} isCreatingTodo={isCreatingTodo} />
      <h3>Todo list</h3>
      {todosWithCompleted(false)}
      <h3>Completed todos</h3>
      {todosWithCompleted(true)}
    </div>
  )
}
