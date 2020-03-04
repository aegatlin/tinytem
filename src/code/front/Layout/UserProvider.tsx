import { gql, useApolloClient } from '@apollo/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { CUser } from '../../types'
import { useAuth0 } from './Auth0Provider'

const FIND_USER_BY_AUTH_ID = gql`
  query FindUserByAuthId($authId: String!) {
    findUserByAuthId(authId: $authId) {
      _id
      authId
    }
  }
`

interface IUser {
  user: CUser
  loading: boolean
  preloading: boolean
}

const UserContext = createContext(null)
export const useUser: () => IUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const client = useApolloClient()
  const { token: auth0Token, user: auth0User, isAuthenticated } = useAuth0()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preloading, setPreloading] = useState(true)
  const shouldFetchUserByAuthId = isAuthenticated && !!auth0Token && !!auth0User

  useEffect(() => {
    const getUser = async () => {
      const send = async () => {
        const { data } = await client.query({
          query: FIND_USER_BY_AUTH_ID,
          variables: { authId: auth0User.sub }
        })

        return data
      }

      const data = await send()
      const newUser = data.findUserByAuthId

      if (newUser) {
        setUser({
          _id: newUser._id,
          authId: newUser.authId,
          todos: newUser.todos
        })
        setLoading(false)
        return
      }

      const response = await fetch('/api/create-user', {
        headers: {
          authorization: `Bearer ${auth0Token}`
        }
      })

      if (response.status !== 200) {
        console.error('Problem creating user')
        return
      }

      const data2 = await send()
      const newUser2 = data2.findUserByAuthid

      if (newUser2) {
        setUser({
          _id: newUser2._id,
          authId: newUser2.authId,
          todos: newUser2.todos
        })
        setLoading(false)
        return
      }

      console.error(
        'Something went horribly wrong when trying to find/create the user'
      )
    }

    if (shouldFetchUserByAuthId) {
      getUser()
      setPreloading(false)
      setLoading(true)
    }
  }, [shouldFetchUserByAuthId])

  const value: IUser = {
    user,
    loading,
    preloading
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
