import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from './auth0'

const TokenContext = React.createContext(null)
export const useToken = () => useContext(TokenContext)

export const TokenProvider = ({ children }) => {
  const { getTokenSilently, isAuthenticated, loading } = useAuth0()
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

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  )
}
