import { ApolloServer } from 'apollo-server-micro'
import { IncomingMessage, ServerResponse } from 'http'
import { authenticate } from '../../code/back/authenticate'
import { resolvers } from '../../code/back/resolvers'
import { typeDefs } from '../../code/back/typeDefs'

interface IContext {
  req: IncomingMessage
  res: ServerResponse
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: IContext) => {
    const [isAuthenticated, user] = await authenticate(req)
    if (!isAuthenticated) {
      res.statusCode = 401
      res.end()
    }

    return { user }
  }
})

export const config = { api: { bodyParser: false } }
export default server.createHandler({ path: '/api/graphql' })
