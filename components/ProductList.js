import {
  Text, Image, SimpleGrid, SpacerLink, LinkOverlay, Flex, Center, LinkBox,
  Spacer
} from "@chakra-ui/react"

const Product = (props) => {
  const { categorySlug, product } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.images[0] ? product.images[0].url : fallbackImage

  return (
    <SimpleGrid bg="gray.50" columns={{sm: 2, md: 4}} spacing="8"
      p="10" textAlign="center" rounded="lg" color="gray.400">
      <LinkBox boxShadow="2xl" p="6" rounded="md" bg="white">
        <Image src={imageSrc} fallbackSrc={fallbackImage}/>
        <LinkOverlay href={`/shop/${categorySlug}/${product.slug}`}></LinkOverlay>
        <Flex>
          <Spacer />
            <Center><Text fontSize="3xl" color="black">{product.name_cn}</Text></Center>
            <Center><Text fontSize="lg" color="grey">{product.slug}</Text></Center>
          <Spacer />
        </Flex>
        <SimpleGrid columns={2} spacingX={5} spacingY={1}>
          <Center><Text fontSize="lg" color="black">货币/Currency</Text></Center>
          <Center><Text fontSize="lg" color="grey">人民币/CYN/¥</Text></Center>

          <Center><Text fontSize="lg" color="black">英国/UK</Text></Center>
          <Center><Text fontSize="lg" color="grey">{product.price_in_uk}</Text></Center>

          <Center><Text fontSize="lg" color="black">中国/China</Text></Center>
          <Center><Text fontSize="lg" color="grey">{product.price_in_china}</Text></Center>
        </SimpleGrid>
      </LinkBox>
    </SimpleGrid>
  )
}

export default function ProductList(props) {
  const { products, categorySlug } = props
  return (
    products.map(product => (
      <Product key={product.slug} categorySlug={categorySlug} product={product}></Product>
    ))
  )
}
