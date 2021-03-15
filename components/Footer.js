import styles from './Footer.module.css'
import Logo from "@components/Logo"
import {
  HStack, Link, Text
} from "@chakra-ui/react"
import S from "string"

export default function Footer(props) {
  const { posts } = props
  return (
    <>
      <footer className={styles.footer}>
        <HStack spacing={4}>
          <Logo/>
          {posts && posts.length > 0 && posts.filter(post => post.is_support).map((post, index) => (
            <Link key={index} href={`/shop/pages/${post.slug}`}><Text as="u">{S(post.slug).humanize().titleCase().s}</Text></Link>
          ))}
        </HStack>
      </footer>
    </>
  )
}
