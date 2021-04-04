import {
  Text, Image, SimpleGrid, SpacerLink, LinkOverlay, Flex, Center,
  Spacer, Box, Link, Heading, Stack
} from "@chakra-ui/react"
import { formatCurrencyString } from 'use-shopping-cart'
import S from "string"

const Product = (props) => {
  const { categorySlug, product } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.product_variants[0] &&
    product.product_variants[0].images[0] &&
    product.product_variants[0].images[0].url || fallbackImage

  const productHref = `/shop/${categorySlug}/${product.slug}`
  return (
    <Link href={productHref} bg="white" pb="8px"
    _hover={{ color:"black", textDecor: "underline" }}>
      <Image _hover={{ opacity: "80%" }} rounded="sm" src={imageSrc} fallbackSrc={fallbackImage} />
      <Text fontWeight="bold" color="black">
        {S(product.slug).humanize().titleCase().s}({product.name_cn})
      </Text>
      <Box color="black">{formatCurrencyString({value: product.gbp_in_uk * 100, currency: "GBP"})}</Box>
    </Link>
  )
}

export default function ProductList(props) {
  const { products, categorySlug } = props
  if (products.length === 0) {
    return (
      <Center>
        Coming soon
      </Center>
    )
  }
  return (
    <Center>
      <SimpleGrid maxW={800} columns={{sm: 2, md: 4}} spacing="2"
        p={5} textAlign="center" rounded="lg">
        {products.map(product => (
          <Product key={product.slug} categorySlug={categorySlug} product={product}/>
        ))}
      </SimpleGrid>
    </Center>
  )
}
