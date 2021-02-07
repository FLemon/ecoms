import { ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.API_PROTOCOL}://${process.env.API_HOST}/graphql`,
  cache: new InMemoryCache()
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

const getCategoryProducts = async (category) => {
  const { data } = await client.query({
    query: gql`
      query GetProducts($category: String!){
        products(where: { category: { slug: $category }}) {
          name_cn
          slug
          images { url }
        }
      }
    `,
    variables: { category }
  })
  return data.products
}

export default { getCategories, getCategoryProducts }
