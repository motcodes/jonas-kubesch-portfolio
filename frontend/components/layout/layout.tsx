import { ReactNode } from 'react'
import { Footer } from './footer'
import { Header } from './header'

export interface ISocialLinks {
  url: string
  title: string
}

export const Layout = ({
  children,
  seo,
  socialLinks,
}: {
  children: ReactNode
  seo?: Object
  socialLinks: Array<ISocialLinks>
}) => (
  <>
    <Header socialLinks={socialLinks} />
    <main>{children}</main>
    <Footer socialLinks={socialLinks} />
  </>
)
