import { SimpleGrid } from "@chakra-ui/react"
import { CartProvider } from 'use-shopping-cart'
import { loadStripe } from '@stripe/stripe-js'

import Layout from '@components/Layout'
import DataClient from '@components/DataClient'
import ProductList from '@components/ProductList'
import ProductDetails from '@components/ProductDetails'
import ShopFront from '@components/ShopFront'
import { CarouselProvider } from "pure-react-carousel"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Shop(props) {
  const { categorySlug, productSlug, productVariants } = props
  const PageComponent = () => {
    if (productSlug) {
      const product = props.products.filter(obj => (obj.slug === productSlug))[0]
      const images = []
      const slideIndex = {}
      productVariants.forEach(pv => {
        slideIndex[pv.colour.slug] = images.length
        images.push(...pv.images)
      })

      return (
        <CarouselProvider naturalSlideWidth={300} naturalSlideHeight={400} infinite={true}
          visibleSlides={1} totalSlides={images.length} hasMasterSpinner lockOnWindowScroll>
          <ProductDetails product={product} slideIndex={slideIndex} images={images} {...props} />
        </CarouselProvider>
      )
    }
    if (categorySlug) {
      return <ProductList {...props} />
    }
    return <ShopFront {...props} />
  }

  return (
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="GBP">
      <Layout {...props}>
        <PageComponent />
      </Layout>
    </CartProvider>
  )
}

export async function getStaticProps({ params }) {
  let categorySlug = ""
  let productSlug = ""
  if (params && params.slug) {
    [categorySlug, productSlug] = params.slug
  }

  return {
    props: {
      categorySlug,
      productSlug: productSlug || null,
      categories: await DataClient.getCategories(),
      products: await DataClient.getCategoryProducts(categorySlug),
      productVariants: await DataClient.getProductVariants(productSlug)
    }
  }
}

export async function getStaticPaths() {
  let paths = [{ params: { slug: [] } }]
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
