import { HttpLink } from 'apollo-link-http'
import {
  ApolloServer,
  introspectSchema,
  makeRemoteExecutableSchema
} from 'apollo-server-micro'
import fetch from 'isomorphic-unfetch'
import { authenticate } from './authenticate'

const link = new HttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  fetch,
  headers: {
    Authorization: `Bearer ${process.env.FAUNADB_KEY}`
  }
})

let apolloServerHandler: (req, res) => Promise<void>

export const getApolloServerHandler = async () => {
  if (apolloServerHandler) return apolloServerHandler

  const schema = makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link
  })

  const context = async ({ req, res }) => {
    const [isAuthenticated, user] = await authenticate(req)
    if (!isAuthenticated) {
      res.statusCode = 401
      res.end()
    }
    return { user }
  }

  const server = new ApolloServer({ schema, context })
  apolloServerHandler = server.createHandler({ path: '/api/gql' })
  return apolloServerHandler
}
