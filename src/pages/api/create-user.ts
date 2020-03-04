import { NextApiRequest, NextApiResponse } from 'next'
import { authenticate } from '../../code/back/authenticate'
import { GraphQLClient } from 'graphql-request'

const gqlClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    Authorization: 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'
  }
})

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
  } catch (e) {
    console.error('Trying to create a user that already exists!')
    console.error(e)
    res.statusCode = 500
    res.end()
  }
}
