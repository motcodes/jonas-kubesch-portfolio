import React from 'react'
import { Nav } from './nav'

export const Layout = ({
  children,
  seo,
}: {
  children: React.ReactNode
  seo?: Object
}) => (
  <>
    <Nav />
    {children}
  </>
)
