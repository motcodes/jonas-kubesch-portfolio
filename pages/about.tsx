import { RichText } from 'prismic-reactjs'
import { Pyramid } from 'components/3DModels'
import { Education } from 'components/educations'
import { Image } from 'components/image'
import { Layout } from 'components/layout'
import { IAbout, IEducations, IGlobalContext } from 'interfaces'
import { getAbout, getGlobalData } from 'lib'
import style from '../styles/about.module.scss'
import { useFloatingAnimation } from 'lib'
import { useRef } from 'react'

export default function About({
  about,
  education,
  global,
}: {
  about: IAbout
  education: Array<IEducations>
  global: IGlobalContext
}) {
  const pyramidRef = useRef<HTMLDivElement>(null)
  useFloatingAnimation({ ref: pyramidRef, toDesktop: 10 })
  return (
    <Layout global={global}>
      <div className={style.about}>
        <Pyramid pyramidRef={pyramidRef} className={style.about__model} />
        <h1 className={style.about__heading}>
          Want to know
          <br />
          more?
        </h1>
        <figure className={style.about__figure}>
          <Image
            image={{
              url: about.image.url,
              alt: `A picture of Jonas Kubesch`,
              layout: 'responsive',
              width: about.image.dimensions.width,
              height: about.image.dimensions.height,
              objectFit: 'cover',
            }}
            className={style.about__figure__image}
          />
        </figure>
        <article className={style.about__article}>
          <RichText render={about.content} />
        </article>
        <Education data={education} />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { about, education } = await getAbout()
  const { global, socialLinks } = await getGlobalData()
  return {
    props: {
      about,
      education,
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 1,
  }
}
