import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import { fetchAPI } from '../../lib/api'
import { Layout } from '../../components/layout'
import { Image } from '../../components/image'
import { Seo } from '../../components/seo'
import { getStrapiMedia } from '../../lib/media'

const Article = ({ article }) => {
  const imageUrl = getStrapiMedia(article.image)

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div id='banner' className='' data-src={imageUrl} data-srcset={imageUrl}>
        <h1>{article.title}</h1>
      </div>
      <div className=''>
        <div className=''>
          <ReactMarkdown source={article.content} escapeHtml={false} />
          <hr className='' />
          <div className=''>
            <div>
              {article.author.picture && (
                <Image image={article.author.picture} />
              )}
            </div>
            <div className=''>
              <p className=''>By {article.author.name}</p>
              <p className=''>
                <Moment format='MMM Do YYYY'>{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articles = await fetchAPI('/articles')

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`)
  const categories = await fetchAPI('/categories')

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  }
}

export default Article
