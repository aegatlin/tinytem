import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import React, { useContext, useEffect, useState } from 'react'

const Auth0Context = React.createContext(null)

interface IAuth0 {
  isAuthenticated: boolean
  user: {
    name: string
    picture: string
    sub: string
  }
  token: string
  loading: boolean
  loginWithRedirect(): Promise<void>
  logout(): void
}

export const useAuth0: () => IAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({ children }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState()
  const [auth0Client, setAuth0Client] = useState<Auth0Client>()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const initAuth0 = async () => {
      const newAuth0Client = await createAuth0Client({
        domain: 'gatlin.auth0.com',
        client_id: 'fL4roRqgEk4LJYeQTPv0hAAT166bfqu0',
        audience: 'tinytem-api',
        redirect_uri: 'http://localhost:3000'
      })

      setAuth0Client(newAuth0Client)

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await newAuth0Client.handleRedirectCallback()
        window.history.replaceState(
          {},
          document.title,
          appState?.targetUrl ?? window.location.pathname
        )
      }

      const newIsAuthenticated = await newAuth0Client.isAuthenticated()
      setIsAuthenticated(newIsAuthenticated)
      if (newIsAuthenticated) {
        const newUser = await newAuth0Client.getUser()
        setUser(newUser)
      }

      setLoading(false)
    }

    initAuth0()
  }, [])

  useEffect(() => {
    const updateToken = async () => {
      const newToken = await auth0Client.getTokenSilently()
      setToken(newToken)
    }

    if (isAuthenticated && !token) {
      updateToken()
    }
  })

  const value: IAuth0 = {
    isAuthenticated,
    user,
    token,
    loading,
    loginWithRedirect: () => auth0Client.loginWithRedirect(),
    logout: () => auth0Client.logout()
  }

  return <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>
}
