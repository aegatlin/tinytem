import { width } from 'csstips'
import { style } from 'typestyle'

const todoClass = style({
  padding: '5px',
  width: '200px',
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
  wordBreak: 'break-all',
  padding: '0 10px'
})

const buttonClass = style({
  height: '25px',
  width: '25px'
})

export const Todo = ({ todo, deleteTodo, toggleCompleted }) => {
  const { title } = todo

  return (
    <div className={todoClass}>
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
