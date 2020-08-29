import Link from 'next/link'

import Date from '../components/date'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedContentData, getBlogDirectory } from '../utils/content'

const Home = ({ allPostsData }) => (
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
    {allPostsData.length > 0 &&
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Publicações</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, description }) => (
            <li className={utilStyles.listItem} key={id}>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <br />
              <Link href="/blog/[id]" as={`/blog/${id}`}>
                <a>{title}</a>
              </Link>
              {description && (
                <div>
                  <small className={utilStyles.lightText}>{description}</small>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    }
  </Layout>
)

export const getStaticProps = async () => ({
  props: {
    allPostsData: getSortedContentData(getBlogDirectory())
  },
})

export default Home
