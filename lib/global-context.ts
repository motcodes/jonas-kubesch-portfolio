import { IGlobalContext } from 'interfaces'
import { createContext } from 'react'

export const defaultGlobalContext = {
  sitename: '',
  logo: {
    url: '',
    alt: '',
    dimensions: {
      width: 512,
      height: 512,
    },
  },
  metatitle: '',
  metadescription: '',
  metaimage: '',
  email: '',
  socialLinks: [],
}

// Store Strapi Global object in context
export const GlobalContext = createContext<IGlobalContext | null>(
  defaultGlobalContext
)
