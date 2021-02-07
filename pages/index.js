import { Image } from "@chakra-ui/react"

import Layout from '@components/Layout'
import DataClient from '@components/DataClient'

export default function Home(props) {
  return (
    <Layout {...props}>
      <p>Home</p>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      categories: await DataClient.getCategories()
    }
  }
}
