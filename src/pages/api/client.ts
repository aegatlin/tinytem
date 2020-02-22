import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { gqlq } from '../../code/gqlq'

const FAUNA_DB_URI = 'https://graphql.fauna.com/graphql'
const AUTH = 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'

export default async (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
      fetch,
      uri: FAUNA_DB_URI,
      headers: {
        Authorization: AUTH
      }
    })
  })

  const r = await client.query({
    query: gqlq.query.allTodos
  })

  console.log(r)

  res.json({ a: 'hey' })
}
