import { ISeo } from 'interfaces'
import Head from 'next/head'
import { useContext } from 'react'
import { GlobalContext } from '../lib'

export const Seo = ({ seo }: { seo?: ISeo }) => {
  const { logo, email, ...defaultSeo } = useContext(GlobalContext)

  const fullSeo = {
    ...defaultSeo,
    ...seo,
    favIcon: logo.url,
  }

  return (
    <Head>
      {fullSeo.favIcon && (
        <link rel="shortcut icon" href={fullSeo.favIcon} type="image" />
      )}
      {fullSeo.metatitle && (
        <>
          <title>{fullSeo.metatitle}</title>
          <meta property="og:title" content={fullSeo.metatitle} />
          <meta name="twitter:title" content={fullSeo.metatitle} />
        </>
      )}
      {fullSeo.metadescription && (
        <>
          <meta name="description" content={fullSeo.metadescription} />
          <meta property="og:description" content={fullSeo.metadescription} />
          <meta name="twitter:description" content={fullSeo.metadescription} />
        </>
      )}
      {fullSeo.metaimage && (
        <>
          <meta property="og:image" content={fullSeo.metaimage} />
          <meta name="twitter:image" content={fullSeo.metaimage} />
          <meta name="image" content={fullSeo.metaimage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
