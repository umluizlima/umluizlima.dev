import Articles from '../components/articles'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {
  getSortedContentData,
  getBlogDirectory,
  getContentData,
  getContentDirectory,
} from '../utils/content'

const Home = ({ articles, home }) => (
  <Layout home>
    <section className={utilStyles.headingMd}>
      <div dangerouslySetInnerHTML={{ __html: home.content }} />
    </section>
    <Articles articles={articles} styles={utilStyles} />
  </Layout>
)

export const getStaticProps = async () => ({
  props: {
    home: getContentData(getContentDirectory(), 'home'),
    articles: getSortedContentData(getBlogDirectory())
  },
})

export default Home
