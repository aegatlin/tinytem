import { HttpLink } from 'apollo-link-http'
import {
  ApolloServer,
  introspectSchema,
  makeRemoteExecutableSchema
} from 'apollo-server-micro'
import { GraphQLSchema } from 'graphql'
import fetch from 'isomorphic-unfetch'
import { authenticate } from '../../code/back/authenticate'

let schema: GraphQLSchema, server: ApolloServer

const link = new HttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  fetch,
  headers: {
    Authorization: `Bearer ${process.env.FAUNADB_KEY}`
  }
})

const getSchema = async (): Promise<GraphQLSchema> => {
  if (schema) return schema

  schema = makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link
  })

  return schema
}

const getServer = (schema: GraphQLSchema): ApolloServer => {
  if (server) return server

  server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const [isAuthenticated, user] = await authenticate(req)

      if (!isAuthenticated) {
        res.statusCode = 401
        res.end()
      }

      return { user }
    }
  })

  return server
}

export const config = { api: { bodyParser: false } }
export default async (req, res) => {
  const server = getServer(await getSchema())
  await server.createHandler({ path: '/api/gql' })(req, res)
}
