import Link from 'next/link'
import { Image } from './image'
import style from '../styles/projects.module.scss'
import { IProjects } from 'interfaces'

export function Projects({ data }: { data: Array<IProjects> }) {
  console.log('data :', data)
  return (
    <section className={style.projects}>
      <h2 className={style.projects__heading}>Work</h2>
      {data.map((project) => (
        <Link href={`/work/${project.slug}`} key={project.slug}>
          <a className={style.container}>
            <div className={style.container__info}>
              <h3 className={style.container__info__title}>{project.title}</h3>
              <p className={style.container__info__copy}>
                {project.description.substring(0, 280)}...
              </p>
            </div>
            <figure className={style.container__figure}>
              <Image
                image={{
                  url: project.heroimage.url,
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
