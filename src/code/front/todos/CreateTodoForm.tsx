import { useRef } from 'react'
import { useUser } from '../Layout/UserProvider'

export const CreateTodoForm = ({ createTodo, isCreatingTodo }): JSX.Element => {
  const { user } = useUser()
  const input = useRef(null)

  const onSubmit = (e): void => {
    e.preventDefault()
    createTodo({
      variables: { title: input.current.value, userId: user._id }
    })
    input.current.value = ''
  }

  return (
    <>
      <h3>Add a new todo</h3>
      {isCreatingTodo && <div>Creating...</div>}
      <form onSubmit={onSubmit}>
        <input type="text" name="add-todo" ref={input} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
