import { NextApiRequest, NextApiResponse } from 'next'
import { authenticate } from '../../code/back/authenticate'
import { gqlClient } from '../../code/back/resolvers'

const createUserMutation = `
  mutation CreateUser($authId: String!) {
    createUser(data: { authId: $authId }) {
      _id
      authId
    }
  }`

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [isAuthenticated, user] = await authenticate(req)

  if (!isAuthenticated) {
    res.statusCode = 401
    res.end()
  }

  try {
    await gqlClient.request(createUserMutation, {
      authId: user.authId
    })

    res.statusCode = 200
    res.end()
  } catch {
    console.error('Trying to create a user that already exists!')
    res.statusCode = 500
    res.end()
  }
}
