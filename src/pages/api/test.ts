import fetch from 'isomorphic-unfetch'
import { JWK, JWT } from 'jose'

const JWKS_URI = 'https://gatlin.auth0.com/.well-known/jwks.json'

export default async (req, res) => {
  try {
    const { headers } = req
    const token = headers.authorization.split(' ')[1]
    const jwksJson = await (await fetch(JWKS_URI)).json()
    const key = JWK.asKey(jwksJson.keys[0])
    JWT.verify(token, key, { complete: true })
    res.status(200).end()
  } catch (e) {
    console.error(e)
    res.status(401).end()
  }
}
