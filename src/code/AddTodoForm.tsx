import { useRef } from 'react'

export const AddTodoFormUI = ({ addTodo }) => {
  const input = useRef(null)

  const onSubmit = e => {
    e.preventDefault()
    addTodo({ title: input.current.value, completed: false })
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
