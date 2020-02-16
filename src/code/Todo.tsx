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
    width: '250px',
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

export const Todo = ({
  todo: { title, completed },
  deleteTodo,
  toggleCompleted
}) => {
  return (
    <div className={todoClass(completed)}>
      <button className={buttonClass} onClick={toggleCompleted}>
        ✓
      </button>
      <div className={titleClass}>{title}</div>
      <button className={buttonClass} onClick={deleteTodo}>
        X
      </button>
    </div>
  )
}
