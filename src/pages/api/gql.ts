import { getApolloServerHandler } from '../../code/back/getApolloServerHandler'

export const config = { api: { bodyParser: false } }

export default async (req, res) => {
  const handler = await getApolloServerHandler()
  await handler(req, res)
}
