import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import { useAuth0 } from './Auth0Provider'

export const GraphQLProvider = ({ children }) => {
  const { token } = useAuth0()

  const client = new ApolloClient({
    link: new HttpLink({
      fetch: fetch,
      uri: '/api/graphql',
      headers: {
        Authorization: `Bearer ${token ?? ''}`
      }
    }),
    cache: new InMemoryCache()
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
