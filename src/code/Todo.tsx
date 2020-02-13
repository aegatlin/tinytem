import { gql, useMutation } from '@apollo/client'
import { apolloClient } from './Layout'

export class Todo {
  id: string
  title: string
  completed: boolean
}

interface ITodo {
  todo: Todo
  deleteTodo(todoId: string): void
}

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`

export const TodoUI = ({
  todo: { id, title, completed },
  deleteTodo
}: ITodo) => {
  const onCompleted = data => {
    deleteTodo(data.deleteTodo._id)
  }

  const [deleteTodoMutation, results] = useMutation(DELETE_TODO, {
    client: apolloClient,
    onCompleted
  })

  console.log('todo id ', id)

  const deleteHandler = () => {
    deleteTodoMutation({ variables: { id } })
  }

  return (
    <div>
      {title} | {completed ? 'completed' : 'incomplete'}
      <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}
