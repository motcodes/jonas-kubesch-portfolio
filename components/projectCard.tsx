import Link from 'next/link'
import { Image } from './image'
import { IProjects } from 'interfaces'
import { getDate } from 'lib'
import style from '../styles/projects.module.scss'

export function ProjectCard({
  data,
  heading = 'Selcted Projects',
  isWork = false,
}: {
  data: Array<IProjects>
  heading?: string
  isWork?: boolean
}) {
  return (
    <section className={style.projects}>
      <h2 className={style.projects__heading}>{heading}</h2>
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
