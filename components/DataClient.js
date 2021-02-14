import { ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.API_PROTOCOL}://${process.env.API_HOST}/graphql`,
  cache: new InMemoryCache(),
  onError: (e) => { console.log(JSON.Stringify(e))}
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
  const { data } = await client.query({
    query: gql`
      query GetProducts($categorySlug: String!) {
        products(where: { category: { slug: $categorySlug }}) {
          name_cn
          slug
          images { url }
          cyn_in_china
          cyn_in_uk
          gbp_in_china
          gbp_in_uk
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
            images { url }
            cyn_in_china
            cyn_in_uk
            gbp_in_china
            gbp_in_uk
            stock_level
            limited_edition
            variants {
              name_cn
              slug
              variant_type {
                name_cn
                slug
              }
            }
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
