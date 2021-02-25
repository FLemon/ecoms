import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import Stripe from 'stripe'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import S from "string"

const stripe = Stripe(process.env.STRIPE_KEY_SECRET);

const client = new ApolloClient({
  uri: `${process.env.API_PROTOCOL}://${process.env.API_HOST}/graphql`,
  cache: new InMemoryCache(),
  onError: (e) => {
    console.log(JSON.Stringify(e))
  }
})

const getInventory = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        productVariants {
          product { gbp_in_uk, slug }
          slug
          images { url }
          colour { slug, name_cn }
          gbp_in_uk
          limited_edition
          s m l xl xxl xxl
        }
      }
    `
  })

  const inventory = []
  data.productVariants.forEach(pv => {
    const allSizeVariants = ["s", "m", "l", "xl", "xxl", "xxxl"].filter(s => pv[s] > 0).map(size => ({
      name: S(pv.product.slug).humanize().titleCase().s,
      sku: `${pv.slug}-${size}`,
      price: (pv.gbp_in_uk || pv.product.gbp_in_uk)*100,
      image: pv.images[0].url,
      description: `colour: ${pv.colour.slug}, size: ${size}`,
      currency: "GBP"
    }))
    inventory.push(...allSizeVariants)
  })
  return inventory
}

export default async (req, res) => {
  const callbackUrl = `${req.headers.origin}/shop?stripe_session_id={CHECKOUT_SESSION_ID}`
  const cartItems = req.body
  console.log(cartItems)
  const inventory = await getInventory()
  console.log(inventory[0])
  const line_items = validateCartItems(inventory, cartItems)
  console.log(line_items)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: callbackUrl,
    cancel_url: callbackUrl,
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
  });

  res.status = 200
  res.json({ id: session.id })
};
