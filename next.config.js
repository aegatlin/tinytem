require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'
const AUTH0_REDIRECT_URI = isProd
  ? 'https://tinytem.now.sh'
  : 'http://localhost:3000'

module.exports = {
  env: {
    AUTH0_REDIRECT_URI
  }
}
