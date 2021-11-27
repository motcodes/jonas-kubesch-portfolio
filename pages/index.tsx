import { Cone } from 'components/3DModels'
import { Hero } from 'components/hero'
import { ProjectCard } from 'components/projectCard'
import { getGlobalData, getHomepage, useRect } from 'lib'
import { useRef } from 'react'
import { Layout } from '../components/layout/layout'
import { Seo } from '../components/seo'
import style from '../styles/home.module.scss'

export default function Home({ homepage, global }) {
  const { projects, works, description } = homepage
  const heroRef = useRef<HTMLElement>(null)
  const rect = useRect(heroRef)
  console.log(rect)

  return (
    <Layout global={global}>
      <Seo />
      <Hero heroRef={heroRef} description={description} />
      <Cone
        style={{
          top: rect?.height,
          right: 32 + rect?.left,
        }}
        className={style.home__model}
      />
      <ProjectCard data={projects} isIndex />
      <ProjectCard data={works} isWork />
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
