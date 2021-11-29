import { useRef } from 'react'
import { Cone } from 'components/3DModels'
import { Hero } from 'components/hero'
import { ProjectCard } from 'components/projectCard'
import { Layout } from 'components/layout'
import { Seo } from 'components/seo'
import { getGlobalData, getHomepage, useRect } from 'lib'
import style from 'styles/home.module.scss'

export default function Home({ homepage, global }) {
  const { projects, works, description } = homepage
  const heroRef = useRef<HTMLElement>(null)
  const rect = useRect(heroRef)

  return (
    <Layout global={global}>
      <Seo />
      <Hero heroRef={heroRef} description={description} />
      {rect && (
        <Cone
          style={{
            top: rect?.height,
            right: 32 + rect?.left * 1.5,
          }}
          className={style.home__model}
        />
      )}
      <ProjectCard data={projects} isIndex />
      <ProjectCard data={works} isWork noBMargin />
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
