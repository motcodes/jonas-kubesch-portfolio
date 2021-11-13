import { INextImage } from 'interfaces'
import NextImage from 'next/image'

export const Image = ({ image, style, className }: INextImage) => {
  const { url, alt } = image

  const loader = ({ src, width, quality }) => {
    // console.log({ src })
    return `${src}?w=${width}&q=${quality || 90}`
  }

  return (
    <NextImage
      className={className}
      loader={loader}
      layout={image.layout || 'intrinsic'}
      width={image.width}
      height={image.height}
      objectFit={image.objectFit || 'cover'}
      src={url}
      alt={alt || ''}
    />
  )
}
