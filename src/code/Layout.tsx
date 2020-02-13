import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import fetch from 'isomorphic-unfetch'

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      Authorization: 'Bearer fnADkXkt0_ACE2DsD3728DBVDNwxuKPR7ImmaG_M'
    },
    fetch
  })
})

export const Layout = props => {
  return (
    <ApolloProvider client={apolloClient}>
      <div>
        <h1>TinyTem</h1>
        {props.children}
      </div>
    </ApolloProvider>
  )
}
