/* eslint-disable jsx-a11y/alt-text */
import { Fragment } from 'react'
import { RichText } from 'prismic-reactjs'
import { IImage } from 'interfaces'
import { Image } from './image'
import style from '../styles/dynamicContent.module.scss'
import useInView from 'react-cool-inview'
import gsap from 'gsap'

export function DynamicContent({ data }) {
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
            <AnimatedImage
              idClass={`image-grid-${index}`}
              image={{
                url: image.url,
                alt: image.alt || `Image Grid Item ${index}`,
                layout: 'responsive',
                width: image.dimensions.width,
                height: image.dimensions.height,
              }}
              key={`image-grid-${index}`}
              threshold={0.99}
            />
          ))}
        </div>
      )}
      {/* Single Image */}
      {item.primary?.image && (
        <div className={style.singleImage}>
          <AnimatedImage
            idClass={`single-image-${itemIndex}`}
            image={{
              url: item.primary.image.url,
              alt: item.primary.image.alt || `Single Image`,
              layout: 'responsive',
              width: item.primary.image.dimensions.width,
              height: item.primary.image.dimensions.height,
            }}
            key={`single-image-${itemIndex}`}
          />
        </div>
      )}
      {/* FullSize Image */}
      {item.primary?.fullsizeimage && (
        <AnimatedImage
          idClass={`image-fullsize-${itemIndex}`}
          key={`image-fullsize-${itemIndex}`}
          image={{
            url: item.primary.fullsizeimage.url,
            alt: item.primary.fullsizeimage.alt || `Fullsize Image`,
            layout: 'responsive',
            objectFit: 'cover',
            width: item.primary.fullsizeimage.dimensions.width,
            height: item.primary.fullsizeimage.dimensions.height,
          }}
          className={style.fullsizeImage}
        />
      )}
    </Fragment>
  ))
}

export const AnimatedImage = ({
  idClass,
  image,
  className,
  itemClassName,
  threshold = 0.35,
  delay = 0,
}: {
  idClass: string
  image: any
  className?: string
  itemClassName?: string
  threshold?: number
  delay?: number
}) => {
  const { observe } = useInView({
    threshold: threshold,
    onEnter: ({ unobserve }) => {
      gsap.fromTo(
        `.${idClass}`,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, delay: delay, ease: 'power3.easeOut' }
      )
      gsap.fromTo(
        `.${idClass}`,
        { scale: 1.1 },
        { scale: 1, duration: 1, delay: 0.25, ease: 'power3.easeOut' }
      )
      gsap.set(`.${idClass}`, { backgroundColor: 'var(--blue-6)' })
      unobserve()
    },
  })

  return (
    <figure ref={observe} className={className}>
      <Image image={image} className={`${itemClassName} ${idClass}`} />
    </figure>
  )
}
