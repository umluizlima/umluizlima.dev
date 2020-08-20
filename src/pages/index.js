import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../utils/posts'
import utilStyles from '../styles/utils.module.css'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Olá! Me chamo <strong>Luiz</strong> e sou um Engenheiro de Software brasileiro.
        </p>
        <p>
          Neste site você pode acompanhar minhas <strong>publicações</strong>.
        </p>
        <p>
          Para conhecer mais detalhes de minha <strong>carreira</strong>, recomendo que nos conectemos através do{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/umluizlima">LinkedIn</a>.
        </p>
        <p>
          Se quiser explorar meus <strong>projetos</strong>, me siga no{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/umluizlima">GitHub</a>.
        </p>
        <p>
          Também estou disponível para contato em outras redes sociais, como{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/umluizlima">Facebook</a>{' '}
          ou <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/umluizlima">Twitter</a>.
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
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
