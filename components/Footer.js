import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <img src="/kissy-logo.svg" alt="Kissy Logo" className={styles.logo} />@UK
      </footer>
    </>
  )
}
