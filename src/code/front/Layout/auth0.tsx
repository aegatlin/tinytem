import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import React, { useContext, useEffect, useState } from 'react'

const Auth0Context = React.createContext(null)
export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({ children }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState()
  const [auth0Client, setAuth0Client] = useState<Auth0Client>()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

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
          appState?.targetUrl || window.location.pathname
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

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (opts: getIdTokenClaimsOptions) =>
          auth0Client.getIdTokenClaims(opts),
        loginWithRedirect: (opts: RedirectLoginOptions) =>
          auth0Client.loginWithRedirect(opts),
        getTokenSilently: (opts: GetTokenSilentlyOptions) =>
          auth0Client.getTokenSilently(opts),
        getTokenWithPopup: (opts: GetTokenWithPopupOptions) =>
          auth0Client.getTokenWithPopup(opts),
        logout: (opts: LogoutOptions) => auth0Client.logout(opts)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
