import { useRef, useState, useEffect } from 'react'
import { style } from 'typestyle'

export class CTodo {
  _id: string
  title: string
  completed: boolean
}

const todoClass = (completed: boolean): string =>
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
  todo,
  deleteTodo,
  toggleCompleted,
  updateTitle
}: ITodo): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const input = useRef(null)
  useEffect(() => setIsUpdating(false), [todo])

  const { title, completed } = todo
  const editHandler = (): void => {
    if (isEditing) {
      setIsUpdating(true)
      updateTitle(input.current.value)
    }

    setIsEditing(!isEditing)
  }

  const EditForm = (): JSX.Element => {
    const submitHandler = (e): void => {
      e.preventDefault()
      editHandler()
    }

    return (
      <form className={formClass} onSubmit={submitHandler}>
        <input className={inputClass} ref={input} defaultValue={title} />
      </form>
    )
  }

  const completeHandler = (): void => {
    setIsUpdating(true)
    toggleCompleted()
  }

  const deleteHandler = (): void => {
    setIsDeleting(true)
    deleteTodo()
  }

  return (
    <div className={todoClass(completed)}>
      <button className={buttonClass} onClick={completeHandler}>
        ✓
      </button>
      {isEditing ? (
        <EditForm />
      ) : (
        <div className={titleClass}>
          {isDeleting ? 'Deleting...' : isUpdating ? 'Updating...' : title}
        </div>
      )}
      <button className={buttonClass} onClick={editHandler}>
        ✎
      </button>
      <button className={buttonClass} onClick={deleteHandler}>
        X
      </button>
    </div>
  )
}
