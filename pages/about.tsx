import { RichText } from 'prismic-reactjs'
import { Pyramid } from 'components/3DModels'
import { Education } from 'components/educations'
import { Layout } from 'components/layout'
import { IAbout, IEducations, IGlobalContext } from 'interfaces'
import { getAbout, getGlobalData } from 'lib'
import style from '../styles/about.module.scss'
import { useFloatingAnimation } from 'lib'
import { useEffect, useRef } from 'react'
import { AnimatedImage } from 'components/dynamicContent'
import gsap from 'gsap'
import AnimateInOut from 'utils/AnimateInOut'

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

  useEffect(() => {
    gsap.fromTo(
      '.clip-c',
      { y: '155%', skewY: '3deg' },
      {
        y: 0,
        skewY: 0,
        duration: 1.25,
        delay: 0.7,
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
              Want to know
            </span>
          </span>
          <br />
          <span style={{ lineHeight: '100%' }} className="clip-w">
            <span style={{ lineHeight: '100%' }} className="clip-c">
              more?
            </span>
          </span>
        </h1>
        <AnimatedImage
          idClass="about-image"
          image={{
            url: about.image.url,
            alt: `A picture of Jonas Kubesch`,
            layout: 'responsive',
            width: about.image.dimensions.width,
            height: about.image.dimensions.height,
            objectFit: 'cover',
          }}
          className={style.about__figure}
          itemClassName={style.about__figure__image}
          delay={0.5}
        />
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
