import { withRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

import Date from '../../components/date'
import Disclaimer from '../../components/disclaimer'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../utils/posts'
import SEO from '../../utils/seo'
import utilStyles from '../../styles/utils.module.css'

function Post({ postData, router }) {
  return (
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
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    }
  }
}

export default withRouter(Post)
