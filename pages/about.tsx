import { Layout } from 'components/layout/layout'
import { getGlobalData } from 'lib'
import style from '../styles/about.module.scss'

export default function About({ global }) {
  return (
    <Layout global={global}>
      <div className={style.about}>
        <h1>About me!</h1>
      </div>
      {/* <Education data={education} /> */}
    </Layout>
  )
}

export async function getStaticProps() {
  const { global, socialLinks } = await getGlobalData()
  return {
    props: {
      global: {
        ...global,
        socialLinks,
      },
    },
    revalidate: 1,
  }
}
