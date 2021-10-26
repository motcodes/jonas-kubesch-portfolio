import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import { getStrapiMedia } from 'lib'
import style from '../styles/dynamicContent.module.scss'
import { Image } from './image'

export interface IImage {
  alternativeText: string
  caption: string
  formats: {
    large: { width: number; height: number }
    medium: { width: number; height: number }
    small: { width: number; height: number }
    thumbnail: { width: number; height: number }
  }
  hash: string
  height: number
  id: number
  mime: string
  name: string
  previewUrl: string | null
  size: number
  url: string
  width: number
}

export function DynamicContent({ data }) {
  return data.map((item) => (
    <Fragment key={`dynamic-content-${Math.random() * 100}`}>
      {/* Content - Markdown */}
      {item.content && (
        <ReactMarkdown
          key={item.id}
          source={item.content}
          escapeHtml={false}
          transformImageUri={(src) =>
            src.startsWith('http') ? src : getStrapiMedia({ url: src })
          }
          className={style.content}
        />
      )}
      {/* Image Grid */}
      {item.image && Array.isArray(item.image) && (
        <div className={style.imageGrid}>
          {item.image.map((image: IImage, index) => (
            // <img src={getStrapiMedia(image)} key={`image-grid-${index}`} />
            <Image
              image={{
                url: getStrapiMedia(image),
                alt: `Image Grid Item ${index}`,
                layout: 'responsive',
                width: image.formats.medium.width,
                height: image.formats.medium.height,
              }}
              key={`image-grid-${index}`}
            />
          ))}
        </div>
      )}
      {/* Single Image */}
      {item.singleImage && (
        <div className={style.singleImage}>
          <Image
            image={{
              url: getStrapiMedia(item.singleImage),
              alt: `Single Image`,
              layout: 'responsive',
              width: item.singleImage.width,
              height: item.singleImage.height,
            }}
            key={`single-image-${item.singleImage.src}`}
          />
        </div>
      )}
      {/* FullSize Image */}
      {item.fullsizeImage && (
        <figure className={style.fullsizeImage}>
          <Image
            image={{
              url: getStrapiMedia(item.fullsizeImage),
              alt: `Single Image`,
              layout: 'responsive',
              objectFit: 'cover',
              width: item.fullsizeImage.width,
              height: item.fullsizeImage.height,
            }}
            key={`image-fullsize-${item.fullsizeImage.src}`}
          />
        </figure>
      )}
    </Fragment>
  ))
}
