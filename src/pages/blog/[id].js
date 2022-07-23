import { withRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

import Date from '../../components/date'
import Disclaimer from '../../components/disclaimer'
import Layout from '../../components/layout'
import ShareButton from '../../components/shareButton'
import utilStyles from '../../styles/utils.module.css'
import { getSortedContentData, getContentData, getBlogDirectory } from '../../utils/content'
import SEO from '../../utils/seo'

const Post = ({ postData, router }) => (
  <Layout>
    <DefaultSeo
      title={postData.title}
      description={postData.description}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: `${SEO.canonical}${router.asPath.replace(/\?.*/, '')}`,
        site_name: 'victorfulgencio',
        images: [
          {
            url: `https://og-image.now.sh/${postData.title}.png?theme=light&md=0&fontSize=75px`,
            width: 800,
            height: 600,
            alt: `${postData.title} - cover image`,
          },
        ],
      }}
      canonical={`${SEO.canonical}${router.asPath.replace(/\?.*/, '')}`}
    />
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      <ShareButton
        title={postData.title}
        description={postData.description}
      />
      <hr />
      {postData.disclaimer && <Disclaimer />}
    </article>
  </Layout>
)

export const getStaticPaths = async () => ({
  paths: getSortedContentData(getBlogDirectory()).map((post) => (
    {
      params: { id: post.id },
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
