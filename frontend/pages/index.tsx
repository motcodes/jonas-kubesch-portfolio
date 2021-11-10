import { Educations } from 'components/educations'
import { Hero } from 'components/hero'
import { Projects } from 'components/projects'
import { useEffect } from 'react'
import { Layout } from '../components/layout/layout'
import { Seo } from '../components/seo'
import { fetchAPI } from '../lib'

export default function Home({ homepage, projects, educations, socialLinks }) {
  return (
    <Layout socialLinks={socialLinks}>
      <Seo seo={homepage.seo} />
      <Hero data={homepage} />
      <Projects data={projects} />
      <Educations data={educations} />
    </Layout>
  )
}

export async function getStaticProps() {
  const [homepage, educations] = await Promise.all([
    fetchAPI('/homepage'),
    fetchAPI('/educations'),
  ])
  const projects = homepage.projects.map((prod) => ({
    id: prod.id,
    description: prod.description,
    image: prod.heroImage,
    slug: prod.slug,
    title: prod.title,
  }))

  delete homepage.projects

  return {
    props: { homepage, projects, educations },
    revalidate: 1,
  }
}
