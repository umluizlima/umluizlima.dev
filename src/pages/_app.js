import { Fragment } from 'react'
import { DefaultSeo } from 'next-seo'

import '../styles/code.css'
import '../styles/globals.css'
import SEO from '../utils/seo'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
