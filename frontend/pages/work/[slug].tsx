import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import Link from 'next/link'
import { fetchAPI } from '../../lib/api'
import { Layout } from '../../components/layout/layout'
import { Image } from '../../components/image'
import { Seo } from '../../components/seo'
import { getStrapiMedia } from '../../lib/media'
import style from '../../styles/work.module.scss'
import { DynamicContent } from 'components/dynamicContent'
import { Credits } from 'components/credits'

const Article = ({ article, socialLinks }) => {
  const heroImageUrl = getStrapiMedia(article.heroImage)

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.heroImage,
    article: true,
  }

  return (
    <Layout socialLinks={socialLinks}>
      <Seo seo={seo} />
      <section className={style.hero}>
        <div className={style.hero__wrapper}>
          <h1 className={style.hero__wrapper__heading}>{article.title}</h1>
          <h4>
            {article.myRoles.length > 1 ? (
              <>
                <span>Roles </span>
                <span>&#10041; </span>
                {article.myRoles.map(({ role }, roleIndex) => (
                  <span key={role}>
                    {role}
                    {roleIndex + 1 !== article.myRoles.length && ','}{' '}
                  </span>
                ))}
              </>
            ) : (
              <>
                <span>Role &#10041; </span>
                <span>{article.myRoles[0].role}</span>
              </>
            )}
          </h4>
          <h4>
            Project Link &#10041;{' '}
            <Link href={article.projectLink.url}>
              <a target="_blank" rel="noopener">
                {article.projectLink.title}
              </a>
            </Link>
          </h4>
          <h4>
            Project Year &#10041; <span>{article.projectYearDate}</span>
          </h4>
        </div>
        <figure className={style.hero__banner}>
          <Image
            image={{
              url: heroImageUrl,
              alt: `${article.title} banner`,
              layout: 'fill',
            }}
            className={style.banner__image}
          />
        </figure>
        <div className={style.hero__wrapper__copy}>
          <p className={style.hero__wrapper__copy__text}>
            {article.description}
          </p>
        </div>
      </section>
      <section className={style.container}>
        <article className={style.container__article}>
          <DynamicContent data={article.contentGroup} />
        </article>
      </section>
      <section className={style.container}>
        <Credits data={article.credits} />
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const projects = await fetchAPI('/articles')

  return {
    paths: projects.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const projects = await fetchAPI(`/articles?slug=${params.slug}`)

  return {
    props: { article: projects[0] },
    revalidate: 1,
  }
}

export default Article
