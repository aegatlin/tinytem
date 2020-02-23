import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import React from 'react'
import { useToken } from './TokenProvider'

export const GraphQLProvider = ({ children }) => {
  const { token } = useToken()

  const client = new ApolloClient({
    link: new HttpLink({
      fetch: fetch,
      uri: '/api/graphql',
      headers: {
        Authorization: `Bearer ${token || ''}`
      }
    }),
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
