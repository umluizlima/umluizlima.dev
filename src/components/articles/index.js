import Article from './article'

const Articles = ({ articles, styles }) => (
  articles.length > 0 && (
    <section className={`${styles.headingMd} ${styles.padding1px}`}>
      <h2 className={styles.headingLg}>Blog</h2>
      <ul className={styles.list}>
        {articles.map((article) => (
          <Article article={article} styles={styles} key={article.id} />
        ))}
      </ul>
    </section>
  )
)

export default Articles
