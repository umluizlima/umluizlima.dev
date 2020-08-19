import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
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
          Esta página ainda está em construção. Por enquanto, você pode me conhecer melhor através de redes sociais,
          como <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/umluizlima">LinkedIn</a>,{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/umluizlima">GitHub</a>{' '}
          e <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/umluizlima">Twitter</a>.
        </p>
        <p>Obrigado pela visita!</p>
      </section>
      {allPostsData.length > 0 &&
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Artigos</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title, description }) => (
              <li className={utilStyles.listItem} key={id}>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
                <br />
                <Link href="/artigos/[id]" as={`/artigos/${id}`}>
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
