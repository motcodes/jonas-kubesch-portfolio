import { Cube } from 'components/3DModels'
import { Layout } from 'components/layout'
import { ProjectCard } from 'components/projectCard'
import { Seo } from 'components/seo'
import { getAllProjects, getGlobalData } from 'lib'
import { useFloatingAnimation } from 'lib'
import { useRef, useEffect } from 'react'
import style from '../../styles/projects.module.scss'

export default function WorkPage({ projects, global }) {
  const seo = {
    metaTitle: `List of my case studies and projects`,
    metaDescription: `A list of all of my case studies and projects I have done over the years.`,
    article: true,
  }
  const description =
    'A list of all of my case studies and projects\nI have done over the years.'

  const cubeRef = useRef<HTMLDivElement>(null)
  useFloatingAnimation({ ref: cubeRef, toDesktop: 10 })

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <div className={style.pageWrapper}>
        <Cube cubeRef={cubeRef} className={style.pageWrapper__model} />
        <ProjectCard data={projects} variant="h1" subHeading={description} />
      </div>
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
    revalidate: 86400,
  }
}
