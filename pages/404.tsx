import { Layout } from 'components/layout/layout'
import { getGlobalData } from 'lib'
import { useRouter } from 'next/router'
import { Button } from 'utils/button'
import style from '../styles/404.module.scss'

export default function NotFound({ global }) {
  const router = useRouter()
  return (
    <Layout global={global}>
      <div className={style.notFound}>
        <h1>404</h1>
        <Button onClick={() => router.push('/')}>go back home</Button>
      </div>
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
  }
}
