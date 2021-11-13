import { Layout } from 'components/layout/layout'
import style from '../styles/about.module.scss'

export default function About({ socialLinks }) {
  return (
    <Layout socialLinks={socialLinks}>
      <div className={style.about}>
        <h1>About me!</h1>
      </div>
    </Layout>
  )
}
