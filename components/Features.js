import {
  Flex, Box, SimpleGrid, Heading, Text, Button, useColorModeValue, Link,
  Center
} from "@chakra-ui/react"
import { loadStripe } from '@stripe/stripe-js'
import S from "string"

import { CartProvider } from 'use-shopping-cart'
import Layout from '@components/Layout'
import Banner from '@components/Banner'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Features(props) {
  return (
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="GBP">
      <Layout {...props}>
        <Center>
          <Banner />
        </Center>
      </Layout>
    </CartProvider>
  )
}
