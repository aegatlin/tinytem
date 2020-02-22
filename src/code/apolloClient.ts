import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-unfetch'

export const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: '/api/graphql'
  })
})
