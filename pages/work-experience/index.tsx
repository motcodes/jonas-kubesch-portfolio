import { Layout } from 'components/layout/layout'
import { ProjectCard } from 'components/projectCard'
import { Seo } from 'components/seo'
import { getAllWork, getGlobalData } from 'lib'

export default function WorkPage({ work, global }) {
  const seo = {
    metaTitle: `List of my work`,
    metaDescription: `A list of all of my work experience ofer the years.`,
    article: true,
  }

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <ProjectCard data={work} heading="Work Experience" isWork />
    </Layout>
  )
}

export async function getStaticProps() {
  const work = await getAllWork()
  const { global, socialLinks } = await getGlobalData()

  return {
    props: {
      work,
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 1,
  }
}
