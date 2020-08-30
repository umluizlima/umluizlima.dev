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
        <a>Voltar a página inicial</a>
      </Link>
      <Button
        text={'Voltar ao topo'}
        onClick={backToTop}
      />
    </footer>
  )
}

export default Footer
