import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../code/back/typeDefs'
import { resolvers } from '../../code/back/resolvers'

const server = new ApolloServer({ typeDefs, resolvers })
export const config = { api: { bodyParser: false } }
export default server.createHandler({ path: '/api/graphql' })
