import { getStrapiMedia } from '../lib/media'
import NextImage from 'next/image'

export const Image = ({
  image,
  style,
  className,
}: {
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
}) => {
  const { url, alt } = image

  // const loader = () => {
  //   return getStrapiMedia(image)
  // }
  const loader = ({ src, width, quality }) => {
    console.log({ src })
    return `${getStrapiMedia(image)}?w=${width}&q=${quality || 90}`
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
