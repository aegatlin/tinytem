export const Todo = ({ todo, deleteTodo, toggleCompleted }) => {
  const { title, completed } = todo

  return (
    <div>
      <span>{title}</span>
      <button onClick={toggleCompleted}>
        {completed ? 'Uncomplete' : 'Complete'}
      </button>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  )
}
