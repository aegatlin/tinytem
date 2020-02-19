import fetch from 'isomorphic-unfetch'
import { useEffect, useState } from 'react'
import { useAuth0 } from './auth0'

export const useApi = () => {
  const { isAuthenticated, getTokenSilently } = useAuth0()
  const [token, setToken] = useState()

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const newToken = await getTokenSilently()
        setToken(newToken)
      }
    }

    getToken()
  })

  useEffect(() => {
    const makeFetch = async () => {
      if (token) {
        const response = await fetch('/api/test', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const status = response.status

        if (status === 401) {
          console.error(
            'AUSTIN SAYS YOU AINT AUTHORIZED BUT JUST DIDNT ENFORCE IT YET, PAL'
          )
        }

        if (status === 200) {
          console.log(
            'AUSTIN SAYS YOU ARE ALL GOOD, AUTHORIZATION WISE AND SUCH, ONE DAY IMA ENFORCE IT'
          )
        }
      }
    }

    makeFetch()
  })
}
