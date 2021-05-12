import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import S from "string"

const client = new ApolloClient({
  uri: `${process.env.API_PROTOCOL}://${process.env.API_HOST}/graphql`,
  cache: new InMemoryCache(),
  onError: (e) => {
    console.log(JSON.Stringify(e))
  }
})

const getPosts = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        posts {
          slug
          section {
            content
            header
            images { id, url }
            meta
          }
          is_support
        }
      }
    `
  })
  return data.posts
}

const getCategories = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        categories(sort: "order:asc") {
          name
          slug
          description
          images(limit:1) { url }
          products(sort: "limited_edition:desc") {
            slug
            name
            limited_edition
            currency
          }
        }
      }
    `
  })
  return data.categories
}

const getCategoryProducts = async (categorySlug) => {
  if (!categorySlug) {
    return []
  }
  const { data } = await client.query({
    query: gql`
      query GetProducts($categorySlug: String!) {
        products(
          where: { category: { slug: $categorySlug }},
          sort: "limited_edition:desc"
        ) {
            slug
            name
            currency
            price
            images(limit:1) { url }
            limited_edition
          }
      }
    `,
    variables: { categorySlug }
  })
  return data.products
}

const getProductVariants = async (productSlug) => {
  if (productSlug) {
    const { data } = await client.query({
      query: gql`
        query GetProductVariants($productSlug: String!) {
          productVariants(where: { product: { slug: $productSlug } }) {
            slug
            images { id, url }
            colour { slug, name, hex }
            currency
            price
            limited_edition
            sizes { slug, quantity }
          }
        }
      `,
      variables: { productSlug }
    })
    return data.productVariants
  }
  return []
}

const getInventories = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        productVariants {
          product { currency, price, slug }
          slug
          images(limit:1) { url }
          colour { slug, name }
          currency
          price
          limited_edition
          sizes { slug, quantity }
        }
      }
    `
  })

  const inventories = []
  data.productVariants.forEach(pv => {
    const allSizeVariants = pv.sizes.filter(s => s.quantity > 0).map(size => ({
      id: `${pv.slug}-${size.slug}`,
      price: (pv.price || pv.product.price)*100,
      currency: pv.product.currency.toUpperCase(),
      name: S(pv.product.slug).humanize().titleCase().s,
      image: pv.images[0] && pv.images[0].url,
      description: `colour: ${pv.colour.slug}, size: ${size.slug}`,
      product_data: {
        metadata: {
          sku: `${pv.slug}-${size.slug}`,
        }
      }
    }))
    inventories.push(...allSizeVariants)
  })
  return inventories
}

export default {
  getCategories, getCategoryProducts, getProductVariants, getInventories,
  getPosts
}
