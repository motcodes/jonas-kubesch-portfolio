import Link from 'next/link'
import { getStrapiMedia } from 'lib'
import { Image } from './image'
import style from '../styles/projects.module.scss'
import { IImage } from './dynamicContent'

interface IProjects {
  slug: string
  title: string
  description: string
  image: IImage
  heroImage: IImage
}

export function Projects({ data }: { data: Array<IProjects> }) {
  return (
    <section className={style.projects}>
      <h2 className={style.projects__heading}>Work</h2>
      {data.map((project) => (
        <Link href={`/work/${project.slug}`} key={project.slug}>
          <a className={style.container}>
            <div className={style.container__info}>
              <h3 className={style.container__info__title}>{project.title}</h3>
              <p className={style.container__info__copy}>
                {project.description.substring(0, 140)}...
              </p>
            </div>
            <figure className={style.container__figure}>
              <Image
                image={{
                  url: getStrapiMedia(project.image || project.heroImage),
                  alt: `${project.title} Banner`,
                  layout: 'fill',
                  objectFit: 'cover',
                }}
                className={style.container__figure__image}
              />
            </figure>
          </a>
        </Link>
      ))}
    </section>
  )
}
