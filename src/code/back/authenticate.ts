import { IncomingMessage } from 'http'
import { JWK, JWT } from 'jose'
import { NextApiRequest } from 'next'

const JWKS_URI = 'https://gatlin.auth0.com/.well-known/jwks.json'

interface IPayload {
  sub: string
}

export const authenticate = async (
  req: IncomingMessage | NextApiRequest
): Promise<[boolean, any]> => {
  try {
    const { headers } = req
    const token = headers.authorization.split(' ')[1]
    const jwksJson = await (await fetch(JWKS_URI)).json()
    const key = JWK.asKey(jwksJson.keys[0])
    const { payload } = JWT.verify(token, key, { complete: true })
    const { sub } = payload as IPayload
    const user = {
      authId: sub
    }

    return [true, user]
  } catch (e) {
    return [false, null]
  }
}
