import { IImage } from 'interfaces'
import { RichText } from 'prismic-reactjs'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import style from '../styles/dynamicContent.module.scss'
import { Image } from './image'

export function DynamicContent({ data }) {
  console.log('data :', data[3].fields[0])
  return data.map((item, itemIndex) => (
    <Fragment key={`dynamic-content-${Math.random() * 100}`}>
      {/* Content - Markdown */}
      {item.primary?.content && (
        <div className={style.content}>
          <RichText
            key={`content-${itemIndex}`}
            render={item.primary?.content}
          />
        </div>
      )}
      {/* Image Grid */}
      {item.fields && (
        <div className={style.imageGrid}>
          {item.fields.map(({ image }: { image: IImage }, index) => (
            <Image
              image={{
                url: image.url,
                alt: image.alt || `Image Grid Item ${index}`,
                layout: 'responsive',
                width: image.dimensions.width,
                height: image.dimensions.height,
              }}
              key={`image-grid-${index}`}
            />
          ))}
        </div>
      )}
      {/* Single Image */}
      {item.primary?.image && (
        <div className={style.singleImage}>
          <Image
            image={{
              url: item.primary.image.url,
              alt: item.primary.image.alt || `Single Image`,
              layout: 'responsive',
              width: item.primary.image.dimensions.width,
              height: item.primary.image.dimensions.height,
            }}
            key={`single-image-${item.primary.image.url}`}
          />
        </div>
      )}
      {/* FullSize Image */}
      {item.primary?.fullsizeimage && (
        <figure className={style.fullsizeImage}>
          <Image
            image={{
              url: item.primary.fullsizeimage.url,
              alt: item.primary.fullsizeimage.alt || `Fullsize Image`,
              layout: 'responsive',
              objectFit: 'cover',
              width: item.primary.fullsizeimage.dimensions.width,
              height: item.primary.fullsizeimage.dimensions.height,
            }}
            key={`image-fullsize-${item.primary.fullsizeimage.url}`}
          />
        </figure>
      )}
    </Fragment>
  ))
}
