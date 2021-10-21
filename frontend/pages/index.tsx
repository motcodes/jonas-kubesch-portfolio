import { Layout } from '../components/layout/layout'
import { Seo } from '../components/seo'
import { fetchAPI } from '../lib'
import style from '../styles/home.module.scss'

const Home = ({ homepage, socialLinks }) => {
  return (
    <Layout socialLinks={socialLinks}>
      <Seo seo={homepage.seo} />
      <div className={style.container}>
        <h1>{homepage.hero.title}</h1>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const [homepage] = await Promise.all([fetchAPI('/homepage')])

  return {
    props: { homepage },
    revalidate: 1,
  }
}

export default Home
