import Link from 'next/link'

import Date from '../date'

const Article = ({ article, styles }) => (
  <li className={styles.listItem} key={article.id}>
    <small className={styles.lightText}>
      <Date dateString={article.date} />
    </small>
    <br />
    <Link href="/blog/[id]" as={`/blog/${article.id}`}>
      <a>{article.title}</a>
    </Link>
    {article.description && (
      <div>
        <small className={styles.lightText}>{article.description}</small>
      </div>
    )}
  </li>
)

export default Article
