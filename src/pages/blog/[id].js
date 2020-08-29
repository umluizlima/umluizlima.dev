import { withRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

import Date from '../../components/date'
import Disclaimer from '../../components/disclaimer'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllContentIds, getContentData, getBlogDirectory } from '../../utils/content'
import SEO from '../../utils/seo'

const Post = ({ postData, router }) => (
  <Layout>
    <DefaultSeo
      title={postData.title}
      description={postData.description}
      openGraph={{}}
      canonical={`${SEO.canonical}${router.asPath.replace(/\?.*/, '')}`}
    />
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      <hr />
      {postData.disclaimer && <Disclaimer />}
    </article>
  </Layout>
)

export const getStaticPaths = async () => ({
  paths: getAllContentIds(getBlogDirectory()).map((id) => (
    {
      params: { id },
    }
  )),
  fallback: false
})

export const getStaticProps = async ({ params }) => ({
  props: {
    postData: getContentData(getBlogDirectory(), params.id),
  }
})

export default withRouter(Post)
