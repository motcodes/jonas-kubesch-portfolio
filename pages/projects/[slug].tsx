import Link from 'next/link'
import { Layout } from '../../components/layout/layout'
import { Image } from '../../components/image'
import { Seo } from '../../components/seo'
import { DynamicContent } from 'components/dynamicContent'
import { Credits } from 'components/credits'
import style from '../../styles/projectWorkPage.module.scss'
import { getDate, getGlobalData, getProject, getProjectsWithSlug } from 'lib'
import { GetStaticPaths, GetStaticProps } from 'next'
import { IGlobalContext, IProjectPage } from 'interfaces'
import { Icosahedron } from 'components/3DModels'

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

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <section className={style.hero}>
        <Icosahedron className={style.hero__model} />
        <div className={style.hero__wrapper}>
          <h1 className={style.hero__wrapper__heading}>{title}</h1>
          <h4 className={style.hero__wrapper__subheading}>
            {roles.length > 1 ? (
              roles.map(({ role }, roleIndex) => (
                <span key={role}>
                  {role}
                  {roleIndex + 1 !== roles.length && ','}{' '}
                </span>
              ))
            ) : (
              <span>{roles[0].role}</span>
            )}
          </h4>
          <h4 className={style.hero__wrapper__subheading}>{formattedDate}</h4>
          {projectlink && (
            <Link href={projectlink}>
              <a
                target="_blank"
                rel="noopener"
                className={style.hero__wrapper__link}
              >
                <h4 className={style.hero__wrapper__subheading}>
                  {projectlinkname || title}
                </h4>
              </a>
            </Link>
          )}
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
