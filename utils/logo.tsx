import { useContext } from 'react'
import { Image } from 'components/image'
import { ILogo } from 'interfaces'
import { GlobalContext } from 'lib'

export function Logo({ size = 64, footer = false, className }: ILogo) {
  const { logo, sitename } = useContext(GlobalContext)

  return (
    <figure className={className} style={{ height: size + 2 }}>
      <Image
        image={{
          url: logo.url,
          alt: `${sitename} logo`,
          height: size + 2,
          width: size,
          layout: 'fixed',
        }}
      />
      {footer && (
        <figcaption>
          <h5>{sitename}</h5>
        </figcaption>
      )}
    </figure>
  )
}
