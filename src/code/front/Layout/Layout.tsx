import { normalize, setupPage } from 'csstips'
import { style } from 'typestyle'
import { Auth0Provider } from './Auth0Provider'
import { GraphQLProvider } from './GraphQLProvider'
import { Header } from './Header'
import { UserProvider, useUser } from './UserProvider'

setupPage('#__next')
normalize()

const mainClass = style({
  width: '100%',
  height: '100%'
})

const loadingClass = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
})

const LayoutChildren = ({ children }) => {
  const { loading, preloading } = useUser()

  if (loading || preloading) {
    return (
      <>
        <Header />
        <main className={mainClass}>
          <div className={loadingClass}>Loading...</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className={mainClass}>{children}</main>
    </>
  )
}

export const Layout = ({ children }): JSX.Element => {
  return (
    <Auth0Provider>
      <GraphQLProvider>
        <UserProvider>
          <LayoutChildren>{children}</LayoutChildren>
        </UserProvider>
      </GraphQLProvider>
    </Auth0Provider>
  )
}
