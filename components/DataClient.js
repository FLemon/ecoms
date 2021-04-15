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
          name_cn
          slug
          description
          images(limit:1) { url }
          products(sort: "limited_edition:asc") {
            slug
            name_cn
            limited_edition
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
          sort: "limited_edition:asc"
        ) {
            slug
            name_cn
            gbp_in_uk
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
            colour { slug, name_cn }
            gbp_in_uk
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
          product { gbp_in_uk, slug }
          slug
          images(limit:1) { url }
          colour { slug, name_cn }
          gbp_in_uk
          limited_edition
          sizes { slug, quantity }
        }
      }
    `
  })

  const inventories = []
  data.productVariants.forEach(pv => {
    const allSizeVariants = pv.sizes.filter(s => s.quantity > 0).map(size => ({
      name: S(pv.product.slug).humanize().titleCase().s,
      sku: `${pv.slug}-${size.slug}`,
      price: (pv.gbp_in_uk || pv.product.gbp_in_uk)*100,
      image: pv.images[0] && pv.images[0].url,
      description: `colour: ${pv.colour.slug}, size: ${size.slug}`,
      currency: "GBP"
    }))
    inventories.push(...allSizeVariants)
  })
  return inventories
}

export default {
  getCategories, getCategoryProducts, getProductVariants, getInventories,
  getPosts
}
