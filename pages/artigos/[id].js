import dynamic from 'next/dynamic'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown/with-html'

// import CodeBlock from '../../components/codeBlock'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

const CodeBlock = dynamic(() => import('../../components/codeBlock'))

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          escapeHtml={false}
          source={postData.content}
          renderers={{ code: CodeBlock }}
        />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <hr />
      <div>
        <strong>Observações:</strong> este conteúdo pode incluir links para programas de
        afiliados a partir dos quais posso receber uma pequena comissão caso você realize uma compra.
      </div>
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
      postData
    }
  }
}
