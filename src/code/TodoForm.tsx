import { gql, useMutation } from '@apollo/client'
import { FormEvent, useRef } from 'react'
import { style } from 'typestyle'
import { apolloClient } from './Layout'
import { Todo } from './Todo'

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $completed: Boolean!) {
    createTodo(data: { title: $title, completed: $completed }) {
      _id
      title
      completed
    }
  }
`

export const TodoForm = ({ addTodo }: { addTodo(todo: Todo): void }) => {
  const titleInput = useRef(null)
  const [createTodo] = useMutation(CREATE_TODO, {
    client: apolloClient,
    onCompleted: ({ createTodo: { _id, title, completed } }) =>
      addTodo({ id: _id, title, completed })
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const data = {
      title: titleInput.current.value,
      completed: false
    }
    createTodo({ variables: { title: data.title, completed: data.completed } })
    titleInput.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul className={style({ listStyle: 'none', padding: 0, margin: 0 })}>
        <li>
          <label htmlFor="todo-title">Add Todo: </label>
          <input ref={titleInput} type="text" name="title" id="todo-title" />
        </li>
        <li>
          <button type="submit">Submit</button>
        </li>
      </ul>
    </form>
  )
}
