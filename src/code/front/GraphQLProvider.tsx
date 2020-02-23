import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { useEffect, useState } from 'react'
import { useAuth0 } from './auth0'

export const GraphQLProvider = ({ children }) => {
  const {
    getTokenSilently,
    isAuthenticated,
    loading,
    user
  }: {
    isAuthenticated: boolean
    loading: boolean
    user: any
    getTokenSilently(): Promise<any>
  } = useAuth0()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getToken = async () => {
      const newToken = await getTokenSilently()
      setToken(newToken)
    }

    if (!loading && isAuthenticated && getTokenSilently) {
      getToken()
    }
  }, [loading, isAuthenticated, getTokenSilently])

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

  const isReady = token && user && isAuthenticated && !loading
  if (!isReady) return <div>Loading...</div>

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
