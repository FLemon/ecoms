import { CartProvider } from 'use-shopping-cart'
import { loadStripe } from '@stripe/stripe-js'

import Layout from '@components/Layout'
import DataClient from '@components/DataClient'
import ProductList from '@components/ProductList'
import ProductDetails from '@components/ProductDetails'
import Post from '@components/Post'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Shop(props) {
  const { posts, postSlug, categorySlug, productSlug, productVariants } = props
  const PageComponent = () => {
    if (postSlug) {
      const post = posts.find(p => p.slug === postSlug)
      return <Post post={post}/>
    }
    if (productSlug) {
      const product = props.products.filter(obj => (obj.slug === productSlug))[0]
      const images = []
      const slideIndex = {}
      productVariants.forEach(pv => {
        slideIndex[pv.colour.slug] = images.length
        images.push(...pv.images)
      })

      return <ProductDetails product={product} slideIndex={slideIndex} images={images} {...props} />
    }
    if (categorySlug) {
      return <ProductList {...props} />
    }
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
  let postSlug = ""
  if (params && params.slug) {
    [categorySlug, productSlug] = params.slug
  }
  if (categorySlug === "pages") {
    postSlug = productSlug
  }

  return {
    props: {
      postSlug,
      categorySlug,
      productSlug: productSlug || null,
      categories: await DataClient.getCategories(),
      products: await DataClient.getCategoryProducts(categorySlug),
      productVariants: await DataClient.getProductVariants(productSlug),
      posts: await DataClient.getPosts()
    }
  }
}

export async function getStaticPaths() {
  let paths = []
  const categories = await DataClient.getCategories()
  const posts = await DataClient.getPosts()
  await Promise.all(categories.map(async cat => {
    let productPaths = []
    paths.push({ params: { slug: [cat.slug] } })
    const products = await DataClient.getCategoryProducts(cat.slug)
    productPaths = products.map(pro => {
      paths.push({ params: { slug: [cat.slug, pro.slug] } })
    })
  }))
  await Promise.all(posts.map(async post => {
    paths.push({ params: { slug: ["pages", post.slug]}})
  }))
  return {
    paths,
    fallback: false
  };
}
