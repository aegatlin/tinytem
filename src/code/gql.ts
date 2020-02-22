import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useMutation
} from '@apollo/client'
import { CTodo } from './front/todos/Todo'

export interface IDeleteTodo {
  deleteTodo: {
    _id: string
  }
}

export interface IDeleteTodoVars {
  _id: string
}

export interface ICreateTodo {
  createTodo: CTodo
}

export interface ICreateTodoVars {
  title: string
  completed: boolean
}

export interface IUpdateTodo {
  updateTodo: CTodo
}

export interface IAllTodos {
  allTodos: {
    data: CTodo[]
  }
}

export const gqlq = {
  query: {
    allTodos: gql`
      query {
        allTodos {
          data {
            _id
            title
            completed
          }
        }
      }
    `,
    allTodosQ: `
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
  },
  mutation: {
    createTodo: gql`
      mutation CreateTodo($title: String!, $completed: Boolean!) {
        createTodo(data: { title: $title, completed: $completed }) {
          _id
          title
          completed
        }
      }
    `,
    createTodoQ: `
    mutation CreateTodo($title: String!, $completed: Boolean!) {
      createTodo(data: { title: $title, completed: $completed }) {
        _id
        title
        completed
      }
    }
  `,
    deleteTodo: gql`
      mutation DeleteTodo($_id: ID!) {
        deleteTodo(id: $_id) {
          _id
        }
      }
    `,
    deleteTodoQ: `
    mutation DeleteTodo($_id: ID!) {
      deleteTodo(id: $_id) {
        _id
      }
    }
  `,
    updateTodo: gql`
      mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!) {
        updateTodo(id: $_id, data: { title: $title, completed: $completed }) {
          _id
          title
          completed
        }
      }
    `,
    updateTodoQ: `
    mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!) {
      updateTodo(id: $_id, data: { title: $title, completed: $completed }) {
        _id
        title
        completed
      }
    }
  `
  }
}

export namespace DeleteTodo {
  interface IQueryOrMutation {
    deleteTodo: {
      _id: string
    }
  }

  const queryOrMutation = gql`
    mutation DeleteTodo($_id: ID!) {
      deleteTodo(id: $_id) {
        _id
      }
    }
  `

  interface IVars {
    _id: string
  }

  export const resolverMaker = (
    client: ApolloClient<NormalizedCacheObject>
  ) => async (_, { id }) => {
    const response = await client.mutate<IQueryOrMutation, IVars>({
      mutation: queryOrMutation,
      variables: { _id: id }
    })
    return response.data.deleteTodo
  }

  export const useMutationMaker = (
    client: ApolloClient<NormalizedCacheObject>
  ) => () => {
    const [deleteTodo, { error }] = useMutation<IDeleteTodo, IDeleteTodoVars>(
      gqlq.mutation.deleteTodo,
      {
        client,
        update: (cache, { data }) => {
          const _id = data.deleteTodo._id
          const { allTodos } = cache.readQuery({
            query: gqlq.query.allTodos
          })
          const todos = allTodos?.data

          cache.writeQuery({
            query: gqlq.query.allTodos,
            data: {
              allTodos: { data: todos.filter((t: CTodo) => t._id !== _id) }
            }
          })
        }
      }
    )

    if (error) console.log(error)
    return { deleteTodo }
  }
}
