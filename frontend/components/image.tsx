import { getStrapiMedia } from '../lib/media'
import NextImage from 'next/image'

export const Image = ({
  image,
  style,
}: {
  image: {
    url: string
    alternativeText: string
    width: string | number
    height: string | number
    layout?: 'fixed' | 'responsive' | 'fill' | 'intrinsic'
  }
  style?: Object
}) => {
  const { url, alternativeText } = image

  const loader = () => {
    return getStrapiMedia(image)
  }

  return (
    <NextImage
      loader={loader}
      layout={image.layout || 'intrinsic'}
      width={image.width}
      height={image.height}
      objectFit="contain"
      src={url}
      alt={alternativeText || ''}
    />
  )
}
