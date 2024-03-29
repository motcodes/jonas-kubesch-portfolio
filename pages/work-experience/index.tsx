import { Cube } from 'components/3DModels'
import { Layout } from 'components/layout'
import { ProjectCard } from 'components/projectCard'
import { Seo } from 'components/seo'
import { getAllWork, getGlobalData } from 'lib'
import { useFloatingAnimation } from 'lib'
import { useRef } from 'react'
import style from 'styles/projects.module.scss'

export default function WorkPage({ work, global }) {
  const seo = {
    metaTitle: `List of my work`,
    metaDescription: `A list of all of my work experience over the years.`,
    article: true,
  }
  const cubeRef = useRef<HTMLDivElement>(null)
  useFloatingAnimation({ ref: cubeRef, toDesktop: 10 })

  return (
    <Layout global={global}>
      <Seo seo={seo} />
      <div className={style.pageWrapper}>
        <Cube cubeRef={cubeRef} className={style.pageWrapper__model} />
        <ProjectCard
          data={work}
          variant="h1"
          subHeading={seo.metaDescription}
          isWork
        />
      </div>
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
    revalidate: 86400,
  }
}
