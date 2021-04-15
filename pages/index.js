import { Image } from "@chakra-ui/react"

import Layout from '@components/Layout'
import DataClient from '@components/DataClient'
import Features from '@components/Features'

export default function Home(props) {
  return (
    <Features {...props}/>
  )
}

export async function getStaticProps() {
  return {
    props: {
      categories: await DataClient.getCategories(),
      posts: await DataClient.getPosts()
    }
  }
}
