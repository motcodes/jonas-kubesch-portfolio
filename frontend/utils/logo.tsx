import { Image } from 'components/image'
import { getStrapiMedia, GlobalContext } from 'lib'
import { ReactNode, useContext } from 'react'

interface ILogo {
  size?: number
  footer?: Boolean
  className?: string
}

export function Logo({ size = 64, footer = false, className }: ILogo) {
  const { logo, siteName } = useContext(GlobalContext)

  const logoImage = {
    url: getStrapiMedia(logo),
    alternativeText: `${siteName} logo`,
    height: size,
    width: size,
  }
  return (
    <figure className={className}>
      <Image image={logoImage} />
      {footer && (
        <figcaption>
          <h4>{siteName}</h4>
        </figcaption>
      )}
    </figure>
  )
}
