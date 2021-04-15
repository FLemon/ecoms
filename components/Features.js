import {
  Flex, Box, SimpleGrid, Heading, Text, Button, useColorModeValue, Link,
  Center, VStack
} from "@chakra-ui/react"
import { loadStripe } from '@stripe/stripe-js'

import { CartProvider } from 'use-shopping-cart'
import Layout from '@components/Layout'
import Banner from '@components/Banner'
import Collections from '@components/Collections'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Features(props) {
  const { posts, categories } = props

  return (
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="GBP">
      <Layout posts={posts} categories={categories}>
        <VStack>
          <Banner banner={posts.find(p => p.slug === "banner")}/>
          <Collections categories={categories}/>
        </VStack>
      </Layout>
    </CartProvider>
  )
}
