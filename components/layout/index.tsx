import { ReactNode } from 'react'
import { GlobalContext } from 'lib'
import { Footer } from './footer'
import { Header } from './header'
import style from '../../styles/layout.module.scss'
import AnimateInOut from 'utils/AnimateInOut'
export const Layout = ({
  children,
  global,
}: {
  children: ReactNode
  global?: any
}) => (
  <GlobalContext.Provider value={global}>
    <AnimateInOut>
      <div className={style.wrapper}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </AnimateInOut>
  </GlobalContext.Provider>
)
