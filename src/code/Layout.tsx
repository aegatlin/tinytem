import { Header } from './Header'
import { setupPage, normalize } from 'csstips'
import { style } from 'typestyle'

setupPage('#__next')
normalize()

const mainClass = style({
  width: '100%',
  height: '100%'
})

export const Layout = props => {
  return (
    <>
      <Header />
      <main className={mainClass}>{props.children}</main>
    </>
  )
}
