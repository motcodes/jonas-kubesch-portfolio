import Link from 'next/link'
import { Image } from './image'
import { IProjects } from 'interfaces'
import { getDate } from 'lib'
import style from '../styles/projects.module.scss'
import { Headings } from './Headings'
import { Cone } from './3DModels'

export function ProjectCard({
  data,
  subHeading = '',
  isWork = false,
  isIndex = false,
  variant = 'h2',
}: {
  data: Array<IProjects>
  subHeading?: string
  isWork?: boolean
  isIndex?: boolean
  variant?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <section
      id="projectCard"
      className={`${style.projects}  ${isIndex && style.projects__isIndex}`}
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
