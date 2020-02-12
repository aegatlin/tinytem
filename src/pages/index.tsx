import { gql, useQuery } from '@apollo/client'
import { client, Layout } from '../code/Layout'
import { TodoUI } from '../code/Todo'

const TODOS = gql`
  {
    allTodos {
      data {
        title
        completed
      }
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(TODOS, { client })
  console.log(data)

  if (loading) return <Layout>Loading...</Layout>
  if (error) return <Layout>Error</Layout>

  return (
    <Layout>
      <h2>Todo List</h2>
      <div>
        {data.allTodos.data.map((todo, i) => (
          <TodoUI key={i} todo={todo} />
        ))}
      </div>
    </Layout>
  )
}
