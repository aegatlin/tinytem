import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-unfetch'

const FAUNA_DB_URI = 'https://graphql.fauna.com/graphql'
const AUTH = 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'

export const client = new ApolloClient({
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
