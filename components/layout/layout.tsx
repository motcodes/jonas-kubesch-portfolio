import { GlobalContext } from 'lib'
import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({
  children,
  global,
}: {
  children: ReactNode
  global?: any
}) => (
  <GlobalContext.Provider value={global}>
    <Header />
    <main>{children}</main>
    <Footer />
  </GlobalContext.Provider>
)
