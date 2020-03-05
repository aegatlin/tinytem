import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import {
  ApolloServer,
  makeExecutableSchema,
  makeRemoteExecutableSchema
} from 'apollo-server-micro'
import fetch from 'isomorphic-unfetch'
import { authenticate } from '../../code/back/authenticate'
import { typeDefs } from '../../code/back/typeDefs'

const URI = 'https://graphql.fauna.com/graphql'
const KEY = process.env.FAUNADB_KEY

const httpLink = new HttpLink({ uri: URI, fetch: fetch })
const link = setContext(() => {
  return {
    headers: {
      Authorization: `Bearer ${KEY}`
    }
  }
}).concat(httpLink)

const eschema = makeExecutableSchema({ typeDefs: typeDefs })
const reschema = makeRemoteExecutableSchema({ schema: eschema, link })

const server = new ApolloServer({
  schema: reschema,
  context: async ({ req, res }) => {
    const [isAuthenticated, user] = await authenticate(req)

    if (!isAuthenticated) {
      res.statusCode = 401
      res.end()
    }

    return { user }
  }
})

export const config = { api: { bodyParser: false } }
export default server.createHandler({ path: '/api/gql' })
