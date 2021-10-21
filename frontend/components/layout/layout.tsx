import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({
  children,
  seo,
  socialLinks,
}: {
  children: ReactNode
  seo?: Object
  socialLinks: []
}) => (
  <>
    <Header socialLinks={socialLinks} />
    <main>{children}</main>
    <Footer socialLinks={socialLinks} />
  </>
)
