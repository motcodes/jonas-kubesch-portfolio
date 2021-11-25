import { RichTextBlock } from 'prismic-reactjs'

export interface ISeo {
  metatitle?: string
  metadescription?: string
  metaimage?: string
  article?: boolean
}

export interface INavButton {
  isOpen: Boolean
  toggleOpen: (Boolean) => void
}

export interface ILinks {
  title: string
  url: string
}

export interface ICredits {
  name: string
  role: string
}

export interface IEducations {
  name: string
  department: string
  from: string
  to: string
}

export interface IImage {
  alt: string
  copyright: string | null
  dimensions: {
    width: number
    height: number
  }
  url: string
}

export interface INextImage {
  image: {
    url: string
    alt: string
    width?: string | number
    height?: string | number
    layout?: 'fixed' | 'responsive' | 'fill' | 'intrinsic'
    objectFit?: 'contain' | 'cover' | 'initial' | 'inherit'
  }
  style?: Object
  className?: string
}

export interface IProjects {
  slug: string
  title: string
  roles?: string
  jobtitle?: string
  projectdate?: string
  image: IImage
  heroimage: IImage
  from?: string
  to?: string
}

export interface IGlobalContext {
  sitename: string
  logo: {
    url: string
    alt: string
    dimensions: {
      width: number | string
      height: number | string
    }
  }
  metatitle: string
  metadescription: string
  metaimage: string
  email: string
  socialLinks: Array<ILinks>
}

export interface ILogo {
  size?: number
  footer?: Boolean
  className?: string
}

export interface IHeroImage {
  url: string
  alt: 'string'
  copyright: null | string
  dimensions: {
    width: number
    height: number
  }
  metaimage: IHeroImage
}

export interface IWorkPage {
  title: string
  description: string
  heroimage: IHeroImage
  companylink: string
  from: string
  to: null | string
  jobtitle: string
  body: []
}
export interface IProjectPage {
  title: string
  description: string
  heroimage: IHeroImage
  projectdate: string
  projectlink: string
  projectlinkname: string | null
  roles: [
    {
      role: string
    }
  ]
  credits: [
    {
      role: string
      name: string
    }
  ]
  body: []
}

export interface IAbout {
  image: IHeroImage
  content: RichTextBlock[]
}
