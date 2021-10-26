import { Layout } from 'components/layout/layout'
import { Projects } from 'components/projects'
import { Seo } from 'components/seo'
import { fetchAPI } from 'lib'

export default function WorkPage({ projects, socialLinks }) {
  const seo = {
    metaTitle: `List of my work and projects`,
    metaDescription: `A list of all of my work experience, case studies and projects I have done over the years.`,
    article: true,
  }

  return (
    <Layout socialLinks={socialLinks}>
      <Seo seo={seo} />
      <Projects data={projects} />
    </Layout>
  )
}

export async function getStaticProps() {
  const projects = await fetchAPI(`/articles`)

  return {
    props: { projects },
    revalidate: 1,
  }
}
