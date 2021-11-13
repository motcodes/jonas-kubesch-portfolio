import Link from 'next/link'
import { Layout } from '../../components/layout/layout'
import { Image } from '../../components/image'
import { Seo } from '../../components/seo'
import { DynamicContent } from 'components/dynamicContent'
import { Credits } from 'components/credits'
import style from '../../styles/work.module.scss'
import { getGlobalData, getProject, getProjectsWithSlug } from 'lib'
import { Date } from 'prismic-reactjs'

const Project = ({ data, global }) => {
  console.log('data :', data.body)
  const seo = {
    metatitle: data.title,
    metadescription: data.description,
    metaimage: data.heroimage.url,
    article: true,
  }

  const formattedDate = Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(Date(data.projectdate))

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <section className={style.hero}>
        <div className={style.hero__wrapper}>
          <h1 className={style.hero__wrapper__heading}>{data.title}</h1>
          <h4>
            {data.roles.length > 1 ? (
              <>
                <span>Roles </span>
                <span>&#10041; </span>
                {data.roles.map(({ role }, roleIndex) => (
                  <span key={role}>
                    {role}
                    {roleIndex + 1 !== data.roles.length && ','}{' '}
                  </span>
                ))}
              </>
            ) : (
              <>
                <span>Role &#10041; </span>
                <span>{data.roles[0].role}</span>
              </>
            )}
          </h4>
          <h4>
            Project Link &#10041;{' '}
            <Link href={data.projectlink}>
              <a target="_blank" rel="noopener">
                {data.projectlinkname}
              </a>
            </Link>
          </h4>
          <h4>
            Project Year &#10041; <span>{formattedDate}</span>
          </h4>
        </div>
        <figure className={style.hero__banner}>
          <Image
            image={{
              url: data.heroimage.url,
              alt: `${data.title} banner`,
              layout: 'fill',
            }}
            className={style.banner__image}
          />
        </figure>
        <div className={style.hero__wrapper__copy}>
          <p className={style.hero__wrapper__copy__text}>{data.description}</p>
        </div>
      </section>
      <section className={style.container}>
        <article className={style.container__article}>
          <DynamicContent data={data.body} />
        </article>
      </section>
      <section className={style.container}>
        <Credits data={data.credits} />
      </section>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
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
  }
}

export async function getStaticPaths() {
  const projects = await getProjectsWithSlug()
  return {
    paths: projects.map(({ node }) => `/work/${node._meta.uid}`) || [],
    fallback: true,
  }
}

export default Project
