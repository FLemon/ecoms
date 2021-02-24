import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.API_PROTOCOL}://${process.env.API_HOST}/graphql`,
  cache: new InMemoryCache(),
  onError: (e) => {
    console.log(JSON.Stringify(e))
  }
})

const getCategories = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        categories {
          name_cn
          slug
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
        products(where: { category: { slug: $categorySlug }}) {
          slug
          name_cn
          gbp_in_uk
          product_variants(limit:1) {
            colour { slug, name_cn },
            images { url }
          }
        }
      }
    `,
    variables: { categorySlug }
  })
  return data.products
}

const getProductVariants = async (productSlug) => {
  if (!productSlug) {
    return []
  }
  if (productSlug) {
    const { data } = await client.query({
      query: gql`
        query GetProductVariants($productSlug: String!) {
          productVariants(where: { product: { slug: $productSlug } }) {
            slug
            images { url }
            colour { slug, name_cn }
            gbp_in_uk
            limited_edition
            s m l xl xxl xxl
          }
        }
      `,
      variables: { productSlug }
    })
    return data.productVariants
  }
  return null
}

export default { getCategories, getCategoryProducts, getProductVariants }
