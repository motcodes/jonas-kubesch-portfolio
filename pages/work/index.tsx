import { Layout } from 'components/layout/layout'
import { Projects } from 'components/projects'
import { Seo } from 'components/seo'
import { getAllProjects, getGlobalData } from 'lib'

export default function WorkPage({ projects, global }) {
  const seo = {
    metaTitle: `List of my work and projects`,
    metaDescription: `A list of all of my work experience, case studies and projects I have done over the years.`,
    article: true,
  }

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <Projects data={projects} />
    </Layout>
  )
}

export async function getStaticProps() {
  const projects = await getAllProjects()
  const { global, socialLinks } = await getGlobalData()

  return {
    props: {
      projects,
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 1,
  }
}
