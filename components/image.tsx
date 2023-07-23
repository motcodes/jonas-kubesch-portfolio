import NextImage from 'next/image'
import { INextImage } from 'interfaces'

export const Image = ({ image, className }: INextImage) => {
  const { url, alt } = image

  const loader = ({ src, width, quality }) => {
    if (src.includes('images.prismic')) {
      return `${src}&w=${width}&q=${quality || 75}`
    }
    return src
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
