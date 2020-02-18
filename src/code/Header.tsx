import { style } from 'typestyle'
import { useAuth0 } from './auth0'

const headerClass = style({
  padding: '0 50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 0 3px'
})

const UserProfile = (): JSX.Element => {
  const { loading, user } = useAuth0()

  if (!loading && !user) return null
  if (loading && !user) return <div>Loading user...</div>

  return (
    <div className={style({ display: 'flex' })}>
      <div>{user.name}</div>
      <img
        className={style({ maxWidth: '20px', maxHeight: '20px' })}
        src={user.picture}
        alt="User picture"
      />
    </div>
  )
}

export const Header = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const button = isAuthenticated ? (
    <button onClick={(): void => logout()}>Logout</button>
  ) : (
    <button onClick={(): void => loginWithRedirect()}>Login</button>
  )

  return (
    <div className={headerClass}>
      <h1>TinyTem</h1>
      <div className={style({ display: 'flex' })}>
        <UserProfile />
        {button}
      </div>
    </div>
  )
}
