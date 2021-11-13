import { Image } from 'components/image'
import { ILogo } from 'interfaces'
import { GlobalContext } from 'lib'
import { useContext } from 'react'

export function Logo({ size = 64, footer = false, className }: ILogo) {
  const { logo, sitename } = useContext(GlobalContext)

  return (
    <figure className={className}>
      <Image
        image={{
          url: logo.url,
          alt: `${sitename} logo`,
          height: size,
          width: size,
          layout: 'fixed',
        }}
      />
      {footer && (
        <figcaption>
          <h4>{sitename}</h4>
        </figcaption>
      )}
    </figure>
  )
}
