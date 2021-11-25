import { Education } from 'components/educations'
import { Image } from 'components/image'
import { Layout } from 'components/layout/layout'
import { IAbout, IEducations, IGlobalContext } from 'interfaces'
import { getAbout, getGlobalData } from 'lib'
import { RichText } from 'prismic-reactjs'
import style from '../styles/about.module.scss'

export default function About({
  about,
  education,
  global,
}: {
  about: IAbout
  education: Array<IEducations>
  global: IGlobalContext
}) {
  return (
    <Layout global={global}>
      <div className={style.about}>
        <h1>
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
