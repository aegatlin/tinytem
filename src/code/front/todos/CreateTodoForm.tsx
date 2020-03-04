import { useRef } from 'react'
import { useCreateTodo } from './useCreateTodo'

export const CreateTodoForm = (): JSX.Element => {
  const { createTodo } = useCreateTodo()
  const input = useRef(null)

  const onSubmit = (e): void => {
    e.preventDefault()
    createTodo({ title: input.current.value })
    input.current.value = ''
  }

  return (
    <>
      <h3>Add a new todo</h3>
      <form onSubmit={onSubmit}>
        <input type="text" name="add-todo" ref={input} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
