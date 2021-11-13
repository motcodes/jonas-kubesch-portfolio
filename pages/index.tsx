import { Education } from 'components/educations'
import { Hero } from 'components/hero'
import { Projects } from 'components/projects'
import { getGlobalData, getHomepage } from 'lib'
import { Layout } from '../components/layout/layout'
import { Seo } from '../components/seo'

export default function Home({ homepage, global }) {
  const { projects, education } = homepage
  return (
    <Layout global={global}>
      <Seo />
      <Hero />
      <Projects data={projects} />
      <Education data={education} />
    </Layout>
  )
}

export async function getStaticProps() {
  const homepage = await getHomepage()
  const { global, socialLinks } = await getGlobalData()
  return {
    props: {
      homepage,
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 1,
  }
}
