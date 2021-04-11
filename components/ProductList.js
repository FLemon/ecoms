import {
  Text, Image, SimpleGrid, SpacerLink, LinkOverlay, Flex, Center,
  Spacer, Box, Link, Heading, Stack
} from "@chakra-ui/react"
import S from "string"
import ProductTile from "@components/ProductTile"

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
      <SimpleGrid maxW={800} columns={{base: 1, md: 3}} spacing="2"
        p={5} textAlign="center" rounded="lg">
        {products.map(product => (
          <Link key={product.slug} href={`/shop/${categorySlug}/${product.slug}`}
            bg="white" pb="8px"
            _hover={{ color:"black", textDecor: "none" }}
          >
            <ProductTile product={product} />
          </Link>
        ))}
      </SimpleGrid>
    </Center>
  )
}
