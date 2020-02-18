import { style } from 'typestyle'

const headerClass = style({
  padding: '0 50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 0 3px'
})

export const Header = (): JSX.Element => {
  return (
    <div className={headerClass}>
      <h1>TinyTem</h1>
      <div>About</div>
    </div>
  )
}
