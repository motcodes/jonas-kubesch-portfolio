/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link'
import { IProjects } from 'interfaces'
import { getDate } from 'lib'
import { Headings } from './headings'
import { Image } from './image'
import style from '../styles/projects.module.scss'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

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
  const descRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.fromTo(
      '.clip-c',
      { y: isIndex ? 0 : '155%', skewY: isIndex ? 0 : '3deg' },
      {
        y: 0,
        skewY: 0,
        duration: 1.25,
        stagger: 0.2,
        ease: 'power4.easeOut',
      }
    )

    gsap.fromTo(
      descRef.current,
      {
        y: '100%',
      },
      {
        y: 0,
        duration: 1,
        delay: 0.5,
      }
    )
  }, [isIndex])

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
              <span className="clip-w">
                <span className="clip-c">Work</span>
              </span>
              <br />
              <span className="clip-w">
                <span className="clip-c">Experience</span>
              </span>
            </>
          ) : (
            <>
              <span className="clip-w">
                <span className="clip-c">Selected</span>
              </span>
              <br />
              <span className="clip-w">
                <span className="clip-c">Projects</span>
              </span>
            </>
          )}
        </Headings>
        {subHeading && (
          <h4 ref={descRef} className={style.projects__intro__subheading}>
            {subHeading}
          </h4>
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
                    <span>{getDate(item.from)}</span> -{' '}
                    <span>{item.to ? getDate(item.to) : 'present'}</span>
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
