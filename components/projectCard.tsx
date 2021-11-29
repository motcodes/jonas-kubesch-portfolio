/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link'
import { IProjects } from 'interfaces'
import { getDate } from 'lib'
import { Headings } from './headings'
import { Image } from './image'
import style from '../styles/projects.module.scss'

export function ProjectCard({
  data,
  subHeading = '',
  isWork = false,
  isIndex = false,
  noBMargin = false,
  variant = 'h2',
}: {
  data: Array<IProjects>
  subHeading?: string
  isWork?: boolean
  isIndex?: boolean
  noBMargin?: boolean
  variant?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <section
      id="projectCard"
      className={`${style.projects} ${isIndex ? style.projects__isIndex : ''} 
      ${noBMargin ? style.projects__noBMargin : ''}`}
    >
      <div className={style.projects__intro}>
        <Headings variant={variant} className={style.projects__intro__heading}>
          {isWork ? (
            <>
              Work
              <br />
              Experience
            </>
          ) : (
            <>
              Selected
              <br />
              Projects
            </>
          )}
        </Headings>
        {subHeading && (
          <h4 className={style.projects__intro__subheading}>{subHeading}</h4>
        )}
      </div>
      {data.map((item) => (
        <Link
          href={`/${isWork ? 'work-experience' : 'projects'}/${item.slug}`}
          key={item.slug}
        >
          <a className={style.container}>
            <figure className={style.container__figure}>
              <Image
                image={{
                  url: item.heroimage.url,
                  alt: `${item.title} Banner`,
                  layout: 'fill',
                  objectFit: 'cover',
                }}
                className={style.container__figure__image}
              />
            </figure>
            <div className={style.container__info}>
              <h3 className={style.container__info__title}>{item.title}</h3>
              <p className={style.container__info__role}>
                {isWork ? item.jobtitle : item.roles}
              </p>
              <p className={style.container__info__year}>
                {isWork ? (
                  <>
                    <span>{getDate(item.from)}</span> -
                    <span>{item.to ? getDate(item.to) : ' present'}</span>
                  </>
                ) : (
                  <span>{getDate(item.projectdate)}</span>
                )}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </section>
  )
}
