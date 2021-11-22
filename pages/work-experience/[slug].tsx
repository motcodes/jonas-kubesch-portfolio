import Link from 'next/link'
import { Layout } from '../../components/layout/layout'
import { Image } from '../../components/image'
import { Seo } from '../../components/seo'
import { DynamicContent } from 'components/dynamicContent'
import style from '../../styles/work.module.scss'
import { getDate, getGlobalData, getWork, getWorksWithSlug } from 'lib'
import { GetStaticPaths, GetStaticProps } from 'next'
import { IGlobalContext, IWorkPage } from 'interfaces'

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

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <section className={style.hero}>
        <div className={style.hero__wrapper}>
          <h1 className={style.hero__wrapper__heading}>{title}</h1>
          <h4>
            <span>Role &#10041; </span>
            <span>{jobtitle}</span>
          </h4>
          {companylink && (
            <h4>
              Company Link &#10041;{' '}
              <Link href={companylink}>
                <a target="_blank" rel="noopener">
                  {title}
                </a>
              </Link>
            </h4>
          )}
          <h4>
            <span>{formattedFromDate}</span> - <span>{formattedToDate}</span>
          </h4>
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
        <div className={style.hero__wrapper__copy}>
          <p className={style.hero__wrapper__copy__text}>{description}</p>
        </div>
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
