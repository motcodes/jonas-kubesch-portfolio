import { Layout } from 'components/layout/layout'
import { ProjectCard } from 'components/projectCard'
import { Seo } from 'components/seo'
import { getAllProjects, getGlobalData } from 'lib'

export default function WorkPage({ projects, global }) {
  const seo = {
    metaTitle: `List of my case studies and projects`,
    metaDescription: `A list of all of my case studies and projects I have done over the years.`,
    article: true,
  }
  const description =
    'A list of all of my case studies and projects\nI have done over the years.'

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <ProjectCard data={projects} variant="h1" subHeading={description} />
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
