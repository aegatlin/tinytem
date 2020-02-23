import { ApolloServer } from 'apollo-server-micro'
import { IncomingMessage, ServerResponse } from 'http'
import { JWK, JWT } from 'jose'
import { resolvers } from '../../code/back/resolvers'
import { typeDefs } from '../../code/back/typeDefs'

const JWKS_URI = 'https://gatlin.auth0.com/.well-known/jwks.json'

const authenticate = async (req: IncomingMessage) => {
  try {
    const { headers } = req
    const token = headers.authorization.split(' ')[1]
    console.log('be token:  ', token)
    const jwksJson = await (await fetch(JWKS_URI)).json()
    const key = JWK.asKey(jwksJson.keys[0])
    const result = JWT.verify(token, key, { complete: true })
    console.log('be result:  ', result)
    return true
  } catch (e) {
    return false
  }
}

const context = async ({
  req,
  res
}: {
  req: IncomingMessage
  res: ServerResponse
}) => {
  const isAuthenticated = await authenticate(req)
  if (!isAuthenticated) {
    res.statusCode = 401
    res.end()
  }

  return { a: 3 }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

export const config = { api: { bodyParser: false } }
export default server.createHandler({ path: '/api/graphql' })
