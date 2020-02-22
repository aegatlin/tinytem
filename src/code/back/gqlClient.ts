import { GraphQLClient } from 'graphql-request'

const FAUNA_DB_URI = 'https://graphql.fauna.com/graphql'
const AUTH = 'Bearer fnADkrIdXRACE0yd_1P9EyXxzWIkPz2rrM90E6Pv'

export const gqlClient = new GraphQLClient(FAUNA_DB_URI, {
  headers: {
    Authorization: AUTH
  }
})
