import { Education } from 'components/educations'
import { Hero } from 'components/hero'
import { ProjectCard } from 'components/projectCard'
import { getGlobalData, getHomepage } from 'lib'
import { Layout } from '../components/layout/layout'
import { Seo } from '../components/seo'

export default function Home({ homepage, global }) {
  const { projects, works, description } = homepage
  return (
    <Layout global={global}>
      <Seo />
      <Hero description={description} />
      <ProjectCard data={projects} />
      <ProjectCard data={works} heading="Work Experience" isWork />
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
