import { Header } from './Header'
import { setupPage, normalize } from 'csstips'
import { style } from 'typestyle'
import { Auth0Provider } from './auth0'
import { GraphQLProvider } from './GraphQLProvider'

setupPage('#__next')
normalize()

const mainClass = style({
  width: '100%',
  height: '100%'
})

export const Layout = ({ children }): JSX.Element => {
  return (
    <Auth0Provider>
      <GraphQLProvider>
        <Header />
        <main className={mainClass}>{children}</main>
      </GraphQLProvider>
    </Auth0Provider>
  )
}
