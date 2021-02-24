import {
  Text, Image, SimpleGrid, SpacerLink, LinkOverlay, Flex, Center,
  Spacer, Stat, StatLabel, StatNumber, StatHelpText, Box, Link
} from "@chakra-ui/react"
import S from "string"

const Product = (props) => {
  const { categorySlug, product } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.image ? product.image.url : fallbackImage

  const productHref = `/shop/${categorySlug}/${product.slug}`
  return (
    <Center>
      <Box maxW={200}>
        <Link href={productHref}>
          <Image _hover={{ opacity: "80%" }} rounded="sm" src={imageSrc} fallbackSrc={fallbackImage} />
          <Stat>
            <StatLabel color="black">
              {S(product.slug).humanize().titleCase().s}({product.name_cn})
            </StatLabel>
            <StatNumber color="black">£{product.gbp_in_uk}</StatNumber>
          </Stat>
        </Link>
      </Box>
    </Center>
  )
}

export default function ProductList(props) {
  const { products, categorySlug } = props
  return (
    <Center>
      <SimpleGrid maxW={800} bg="gray.50" columns={{sm: 2, md: 4}} spacing="4"
        p="10" textAlign="center" rounded="lg" color="gray.400">
        <Spacer />
        {products.map(product => (
          <Product key={product.slug} categorySlug={categorySlug}
            product={{image: product.productVariants[0].images[0], ...product}}/>
        ))}
        <Spacer />
      </SimpleGrid>
    </Center>
  )
}
