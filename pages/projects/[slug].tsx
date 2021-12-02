import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Layout } from 'components/layout'
import { Image } from 'components/image'
import { Seo } from 'components/seo'
import { DynamicContent } from 'components/dynamicContent'
import { Credits } from 'components/credits'
import { Icosahedron } from 'components/3DModels'
import { getDate, getGlobalData, getProject, getProjectsWithSlug } from 'lib'
import { IGlobalContext, IProjectPage } from 'interfaces'
import style from 'styles/projectWorkPage.module.scss'
import { useFloatingAnimation } from 'lib'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CardImage, ProjectCard } from 'components/projectCard'

const Project = ({
  data,
  global,
}: {
  data: IProjectPage
  global: IGlobalContext
}) => {
  const {
    title = '',
    description = '',
    heroimage = { url: '', metaimage: { url: '' } },
    roles = [],
    projectdate = '',
    projectlink = '',
    projectlinkname = '',
    body = [],
    credits = [],
  } = data

  const seo = {
    metatitle: title,
    metadescription: description,
    metaimage: heroimage.metaimage.url,
    article: true,
  }

  const formattedDate = getDate(projectdate)

  const icoRef = useRef<HTMLDivElement>(null)
  useFloatingAnimation({ ref: icoRef, toDesktop: 10 })

  useEffect(() => {
    gsap.fromTo(
      '.clip-c',
      { y: '155%', skewY: '3deg' },
      {
        y: 0,
        skewY: 0,
        duration: 1.25,
        delay: 0.7,
        stagger: 0.1,
        ease: 'power4.easeOut',
      }
    )
  }, [])

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <section className={style.hero}>
        <Icosahedron icosahedronRef={icoRef} className={style.hero__model} />
        <div className={style.hero__wrapper}>
          <h1 className={style.hero__wrapper__heading}>
            <span style={{ lineHeight: '100%' }} className="clip-w">
              <span className="clip-c">{title}</span>
            </span>
          </h1>
          <h4 className={style.hero__wrapper__subheading}>
            <span style={{ lineHeight: '110%' }} className="clip-w">
              {roles.length > 1 ? (
                roles.map(({ role }, roleIndex) => (
                  <span
                    key={role}
                    style={{ lineHeight: '125%' }}
                    className="clip-c"
                  >
                    {role}
                    {roleIndex + 1 !== roles.length && ', '}
                  </span>
                ))
              ) : (
                <span style={{ lineHeight: '125%' }} className="clip-c">
                  {roles[0].role}
                </span>
              )}
            </span>
          </h4>
          <h4 className={style.hero__wrapper__subheading}>
            <span style={{ lineHeight: '110%' }} className="clip-w">
              <span style={{ lineHeight: '120%' }} className="clip-c">
                {formattedDate}
              </span>
            </span>
          </h4>
          {projectlink && (
            <Link href={projectlink}>
              <a
                target="_blank"
                rel="noopener"
                className={style.hero__wrapper__link}
              >
                <span style={{ lineHeight: '110%' }} className="clip-w">
                  <span style={{ lineHeight: '120%' }} className="clip-c">
                    <h4 className={style.hero__wrapper__subheading}>
                      {projectlinkname || title}
                    </h4>
                  </span>
                </span>
              </a>
            </Link>
          )}
        </div>
        <div className={style.hero__wrapper__copy}>
          <p className={style.hero__wrapper__copy__text}>{description}</p>
        </div>
        <CardImage
          idClass="hero-banner"
          imageUrl={heroimage.url}
          alt={`${title} banner`}
          className={style.hero__banner}
          itemClassName={style.hero__banner__image}
        />
      </section>
      <section className={style.container}>
        <article className={style.container__article}>
          <DynamicContent data={body} />
        </article>
      </section>
      <section className={style.container}>
        <Credits data={credits} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getProject(params.slug)
  const { global, socialLinks } = await getGlobalData()
  return {
    props: {
      data,
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjectsWithSlug()
  return {
    paths: projects.map(({ node }) => `/projects/${node._meta.uid}`) || [],
    fallback: false,
  }
}

export default Project
