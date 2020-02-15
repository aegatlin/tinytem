import { useRef } from 'react'
import { CTodo } from './Todos'

export const AddTodoFormUI = ({ addTodo }) => {
  const input = useRef(null)

  const onSubmit = e => {
    e.preventDefault()
    const newTodo: CTodo = {
      id: '1',
      title: input.current.value,
      completed: false
    }
    addTodo(newTodo)
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
