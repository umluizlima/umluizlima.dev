import Link from 'next/link'

import styles from './footer.module.css'
import Button from '../button'

const Footer = () => {
  const backToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <a>Back to homepage</a>
      </Link>
      <Button
        text={'Back to top'}
        onClick={backToTop}
      />
    </footer>
  )
}

export default Footer
