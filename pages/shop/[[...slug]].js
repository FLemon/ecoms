import { useRouter } from 'next/router'
import { SimpleGrid } from "@chakra-ui/react"
import { RiMoneyCnyCircleLine } from "react-icons/ri"

import Layout from '@components/Layout'
import DataClient from '@components/DataClient'
import ProductList from '@components/ProductList'
import ProductDetails from '@components/ProductDetails'

export default function Shop(props) {
  const { query } = useRouter()
  const [categorySlug, productSlug] = query.slug

  const PageComponent = () => {
    if (productSlug) {
      const product = props.products.filter(obj => (obj.slug === productSlug))[0]
      return <ProductDetails product={product} categorySlug={categorySlug} productVariants={props.productVariants} />
    }
    return <ProductList products={props.products} categorySlug={categorySlug} />
  }

  return (
    <Layout {...props}>
      <PageComponent />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const [categorySlug, productSlug] = params.slug

  return {
    props: {
      categories: await DataClient.getCategories(),
      products: await DataClient.getCategoryProducts(categorySlug),
      productVariants: await DataClient.getProductVariants(productSlug)
    }
  }
}

export async function getStaticPaths() {
  let paths = []
  const categories = await DataClient.getCategories()
  await Promise.all(categories.map(async cat => {
    let productPaths = []
    paths.push({ params: { slug: [cat.slug] } })
    const products = await DataClient.getCategoryProducts(cat.slug)
    productPaths = products.map(pro => {
      paths.push({ params: { slug: [cat.slug, pro.slug] } })
    })
  }))
  return {
    paths,
    fallback: false
  };
}
