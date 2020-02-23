import { gql, useMutation, useQuery } from '@apollo/client'
import { gqlClient } from './back/gqlClient'
import { CTodo } from './CTodo'

export namespace AllTodos {
  interface IQuery {
    allTodos: {
      data: CTodo[]
    }
  }

  const query = `
    query {
      allTodos {
        data {
          _id
          title
          completed
        }
      }
    }
  `

  export const gqlQuery = gql(query)

  export const resolver = async () => {
    const res = await gqlClient.request<IQuery>(query)
    return res.allTodos
  }

  export const useAllTodos = (): {
    todos: CTodo[]
    isLoadingAllTodos: boolean
  } => {
    const { error, loading, data } = useQuery<IQuery>(gql(query))
    if (error) console.log(error)
    return { todos: data?.allTodos?.data || [], isLoadingAllTodos: loading }
  }
}

export namespace DeleteTodo {
  interface IMutation {
    deleteTodo: {
      _id: string
    }
  }

  const mutation = `
    mutation DeleteTodo($_id: ID!) {
      deleteTodo(id: $_id) {
        _id
      }
    }
  `

  export const resolver = async (_, { id }) => {
    const r = await gqlClient.request<IMutation>(mutation, { _id: id })
    return r.deleteTodo
  }

  interface IVars {
    _id: string
  }

  export const useDeleteTodo = () => {
    const [deleteTodo, { error }] = useMutation<IMutation, IVars>(
      gql(mutation),
      {
        update: (cache, { data }) => {
          const _id = data.deleteTodo._id
          const { allTodos } = cache.readQuery({
            query: AllTodos.gqlQuery
          })
          const todos = allTodos?.data

          cache.writeQuery({
            query: AllTodos.gqlQuery,
            data: {
              allTodos: { data: todos.filter((t: CTodo) => t._id !== _id) }
            }
          })
        }
      }
    )

    if (error) console.log(error)

    const deleteTodoMaker = (todo: CTodo) => (): void => {
      deleteTodo({ variables: { _id: todo._id } })
    }

    return { deleteTodoMaker }
  }
}

export namespace UpdateTodo {
  const mutation = `
    mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!) {
      updateTodo(id: $_id, data: { title: $title, completed: $completed }) {
        _id
        title
        completed
      }
    }
  `
  interface IUpdateTodo {
    updateTodo: CTodo
  }

  export const resolver = async (_, { id, data }) => {
    const { title, completed } = data
    const response = await gqlClient.request<IUpdateTodo>(mutation, {
      _id: id,
      title,
      completed
    })
    return response.updateTodo
  }

  export const useUpdateTodo = () => {
    const [updateTodo, { error }] = useMutation<IUpdateTodo, CTodo>(
      gql(mutation)
    )

    if (error) console.log(error)

    const toggleCompletedMaker = (todo: CTodo) => (): void => {
      updateTodo({ variables: { ...todo, completed: !todo.completed } })
    }

    const updateTitleMaker = (todo: CTodo) => (newTitle: string): void => {
      updateTodo({ variables: { ...todo, title: newTitle } })
    }

    return { toggleCompletedMaker, updateTitleMaker }
  }
}

export namespace CreateTodo {
  interface ICreateTodo {
    createTodo: CTodo
  }

  const mutation = `
    mutation CreateTodo($title: String!, $completed: Boolean!) {
      createTodo(data: { title: $title, completed: $completed }) {
        _id
        title
        completed
      }
    }
  `

  export const resolver = async (_, { data }) => {
    const { title, completed } = data
    const response = await gqlClient.request<ICreateTodo>(mutation, {
      title,
      completed
    })
    return response.createTodo
  }

  interface ICreateTodoVars {
    title: string
    completed: boolean
  }

  export const useCreateTodo = () => {
    const [createTodo, { error, loading }] = useMutation<
      ICreateTodo,
      ICreateTodoVars
    >(gql(mutation), {
      update: (cache, { data }) => {
        const newTodo = data.createTodo
        const { allTodos } = cache.readQuery({ query: AllTodos.gqlQuery })
        const oldTodos = allTodos.data
        cache.writeQuery({
          query: AllTodos.gqlQuery,
          data: { allTodos: { data: oldTodos.concat(newTodo) } }
        })
      }
    })

    if (error) console.log(error)

    const createTodoMaker = ({
      title,
      completed
    }: Exclude<CTodo, '_id'>): void => {
      createTodo({ variables: { title, completed } })
    }

    return { createTodoMaker, isCreatingTodo: loading }
  }
}
