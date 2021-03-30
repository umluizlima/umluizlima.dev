import { Fragment } from 'react'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import '../styles/code.css'
import '../styles/globals.css'
import SEO from '../utils/seo'

const MyApp = ({ Component, pageProps }) => (
  <Fragment>
    <DefaultSeo {...SEO} />
    <Head>
      <script data-goatcounter="https://umluizlima.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
    </Head>
    <Component {...pageProps} />
  </Fragment>
)

export default MyApp
