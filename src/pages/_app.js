import { Fragment, useEffect } from 'react'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'

import '../styles/code.css'
import '../styles/globals.css'
import SEO from '../utils/seo'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    window.goatcounter = { no_onload: true }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => window.goatcounter.count && window.goatcounter.count({
        path: url,
    })
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <Head>
        <script data-goatcounter="https://victorfulgencio.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
