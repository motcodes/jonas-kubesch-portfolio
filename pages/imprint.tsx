import { RichText } from 'prismic-reactjs'
import { Pyramid } from 'components/3DModels'
import { Education } from 'components/educations'
import { Layout } from 'components/layout'
import { IEducations, IGlobalContext, IImprint } from 'interfaces'
import { getGlobalData, getImprint } from 'lib'
import style from '../styles/about.module.scss'
import { useFloatingAnimation } from 'lib'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function About({
  imprint,
  global,
}: {
  imprint: IImprint
  education: Array<IEducations>
  global: IGlobalContext
}) {
  const pyramidRef = useRef<HTMLDivElement>(null)
  useFloatingAnimation({ ref: pyramidRef, toDesktop: 10 })

  useEffect(() => {
    gsap.fromTo(
      '.clip-c',
      { y: '155%', skewY: '3deg' },
      {
        y: 0,
        skewY: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power4.easeOut',
      }
    )
  }, [])
  return (
    <Layout global={global}>
      <div className={style.about}>
        <Pyramid pyramidRef={pyramidRef} className={style.about__model} />
        <h1 className={style.about__heading}>
          <span style={{ lineHeight: '100%' }} className="clip-w">
            <span style={{ lineHeight: '100%' }} className="clip-c">
              <RichText render={imprint.title} />
            </span>
          </span>
        </h1>
        <article className={style.about__article}>
          <RichText render={imprint.body} />
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { imprint } = await getImprint()
  const { global, socialLinks } = await getGlobalData()
  return {
    props: {
      imprint,
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 86400,
  }
}
