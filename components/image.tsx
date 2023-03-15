import NextImage from 'next/legacy/image'
import { INextImage } from 'interfaces'

export const Image = ({ image, className }: INextImage) => {
  const { url, alt } = image

  const loader = ({ src, width, quality }) => {
    return `${src}&q=${quality || 90}`
  }

  return (
    <NextImage
      className={className}
      loader={loader}
      layout={image.layout || 'intrinsic'}
      width={image.width as number}
      height={image.height as number}
      objectFit={image.objectFit || 'cover'}
      src={url}
      alt={alt || ''}
    />
  )
}
