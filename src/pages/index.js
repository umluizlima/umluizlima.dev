import Articles from '../components/articles'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedContentData, getBlogDirectory } from '../utils/content'

const Home = ({ articles }) => (
  <Layout home>
    <section className={utilStyles.headingMd}>
      <p>
        Olá! Me chamo <strong>Luiz</strong> e sou um Engenheiro de Software brasileiro.
      </p>
      <p>
        Neste site você pode acompanhar minhas <strong>publicações</strong>.
      </p>
      <p>
        Para conhecer mais detalhes de minha <strong>carreira</strong>, recomendo que nos conectemos através do{' '}
        <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/umluizlima">LinkedIn</a>.
      </p>
      <p>
        Se quiser explorar meus <strong>projetos</strong>, me siga no{' '}
        <a target="_blank" rel="noopener" href="https://github.com/umluizlima">GitHub</a>.
      </p>
      <p>
        Também estou disponível para contato em outras redes sociais, como{' '}
        <a target="_blank" rel="noopener" href="https://facebook.com/umluizlima">Facebook</a>{' '}
        ou <a target="_blank" rel="noopener" href="https://twitter.com/umluizlima">Twitter</a>.
      </p>
    </section>
    <Articles articles={articles} styles={utilStyles} />
  </Layout>
)

export const getStaticProps = async () => ({
  props: {
    articles: getSortedContentData(getBlogDirectory())
  },
})

export default Home
