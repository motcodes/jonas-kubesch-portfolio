import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Layout } from 'components/layout'
import { Image } from 'components/image'
import { Seo } from 'components/seo'
import { DynamicContent } from 'components/dynamicContent'
import { Icosahedron } from 'components/3DModels'
import { getDate, getGlobalData, getWork, getWorksWithSlug } from 'lib'
import { IGlobalContext, IWorkPage } from 'interfaces'
import style from 'styles/projectWorkPage.module.scss'
import { useFloatingAnimation } from 'lib'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Project = ({
  data,
  global,
}: {
  data: IWorkPage
  global: IGlobalContext
}) => {
  const {
    title = '',
    description = '',
    heroimage = { url: '', metaimage: { url: '' } },
    jobtitle = '',
    from = '',
    to = '',
    companylink = '',
    body = [],
  } = data
  const seo = {
    metatitle: title,
    metadescription: description,
    metaimage: heroimage.metaimage.url,
    article: true,
  }

  const formattedFromDate = getDate(from)
  const formattedToDate = getDate(to) || 'present'

  const icoRef = useRef<HTMLDivElement>(null)
  useFloatingAnimation({ ref: icoRef, toDesktop: 20 })

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
          <h4 className={`${style.hero__wrapper__subheading}`}>
            <span style={{ lineHeight: '110%' }} className="clip-w">
              <span style={{ lineHeight: '120%' }} className="clip-c">
                {jobtitle}
              </span>
            </span>
          </h4>
          {companylink && (
            <Link href={companylink}>
              <a
                target="_blank"
                rel="noopener"
                className={style.hero__wrapper__link}
              >
                <h4 className={`${style.hero__wrapper__subheading}`}>
                  <span style={{ lineHeight: '110%' }} className="clip-w">
                    <span style={{ lineHeight: '120%' }} className="clip-c">
                      Visite Website
                    </span>
                  </span>
                </h4>
              </a>
            </Link>
          )}
          <h4 className={`${style.hero__wrapper__subheading}`}>
            <span style={{ lineHeight: '110%' }} className="clip-w">
              <span style={{ lineHeight: '120%' }} className="clip-c">
                <span>{formattedFromDate}</span> -{' '}
                <span>{formattedToDate}</span>
              </span>
            </span>
          </h4>
        </div>
        <div className={style.hero__wrapper__copy}>
          <p className={style.hero__wrapper__copy__text}>{description}</p>
        </div>
        <figure className={style.hero__banner}>
          <Image
            image={{
              url: heroimage.url,
              alt: `${title} banner`,
              layout: 'fill',
            }}
            className={style.banner__image}
          />
        </figure>
      </section>
      <section className={style.container}>
        <article className={style.container__article}>
          <DynamicContent data={body} />
        </article>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getWork(params.slug)
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
  const projects = await getWorksWithSlug()
  return {
    paths:
      projects.map(({ node }) => `/work-experience/${node._meta.uid}`) || [],
    fallback: false,
  }
}

export default Project
