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

  return (
    <figure className={className}>
      <Image
        image={{
          url: getStrapiMedia(logo),
          alt: `${siteName} logo`,
          height: size,
          width: size,
          layout: 'fixed',
        }}
      />
      {footer && (
        <figcaption>
          <h4>{siteName}</h4>
        </figcaption>
      )}
    </figure>
  )
}
