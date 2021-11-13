import { GlobalContext } from 'lib'
import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'
import style from '../../styles/layout.module.scss'
export const Layout = ({
  children,
  global,
}: {
  children: ReactNode
  global?: any
}) => (
  <GlobalContext.Provider value={global}>
    <div className={style.wrapper}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  </GlobalContext.Provider>
)
