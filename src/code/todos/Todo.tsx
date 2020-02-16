import { useRef, useState } from 'react'
import { style } from 'typestyle'

export class CTodo {
  _id: string
  title: string
  completed: boolean
}

const todoClass = (completed: boolean) =>
  style({
    color: completed ? 'darkgrey' : 'black',
    padding: '5px',
    minWidth: '250px',
    width: '350px',
    margin: '10px',
    border: '1px solid',
    display: 'flex',
    justifyContent: 'space-between'
  })

const titleClass = style({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  wordBreak: 'break-word',
  padding: '0 10px'
})

const buttonClass = style({
  height: '25px',
  width: '25px'
})

const inputClass = style({
  minWidth: '0',
  flex: 1
})

const formClass = style({
  flex: 1,
  display: 'flex'
})

interface ITodo {
  todo: CTodo
  deleteTodo(): void
  toggleCompleted(): void
  updateTitle(newTitle: string): void
}

export const Todo = ({
  todo: { title, completed },
  deleteTodo,
  toggleCompleted,
  updateTitle
}: ITodo) => {
  const [isEditing, setIsEditing] = useState(false)
  const input = useRef(null)

  const editHandler = () => {
    if (isEditing) updateTitle(input.current.value)
    setIsEditing(!isEditing)
  }

  const EditForm = () => {
    const submitHandler = e => {
      e.preventDefault()
      editHandler()
    }

    return (
      <form className={formClass} onSubmit={submitHandler}>
        <input className={inputClass} ref={input} defaultValue={title} />
      </form>
    )
  }

  return (
    <div className={todoClass(completed)}>
      <button className={buttonClass} onClick={toggleCompleted}>
        ✓
      </button>
      {isEditing ? <EditForm /> : <div className={titleClass}>{title}</div>}
      <button className={buttonClass} onClick={editHandler}>
        ✎
      </button>
      <button className={buttonClass} onClick={deleteTodo}>
        X
      </button>
    </div>
  )
}
