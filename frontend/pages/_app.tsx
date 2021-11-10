import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { fetchAPI, getStrapiMedia, GlobalContext } from '../lib'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const { global } = pageProps

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const global = await fetchAPI('/global')
  const { links } = await fetchAPI('/social-media-links')
  return {
    ...appProps,
    pageProps: {
      global,
      socialLinks: links,
    },
  }
}

export default MyApp
