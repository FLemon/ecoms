import {
  Text, Image, SimpleGrid, SpacerLink, LinkOverlay, Flex, Center, LinkBox,
  Spacer
} from "@chakra-ui/react"

const Product = (props) => {
  const { categorySlug, product } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.images[0] ? product.images[0].url : fallbackImage

  return (
    <Center>
      <LinkBox maxW={200}>
        <Image rounded="sm" src={imageSrc} fallbackSrc={fallbackImage}/>
        <LinkOverlay href={`/shop/${categorySlug}/${product.slug}`}></LinkOverlay>
        <Spacer />
          <SimpleGrid columns={2}>
            <Center><Text fontSize="lg" color="black">{product.name_cn}</Text></Center>
            <Center><Text fontSize="md" color="grey">{product.slug}</Text></Center>
          </SimpleGrid>
        <Spacer />
        <SimpleGrid columns={2} spacingX={5} spacingY={1}>
          <Center><Text fontSize="sm" color="black">英国/UK</Text></Center>
          <Center><Text fontSize="sm" color="grey">¥{product.price_in_uk}</Text></Center>

          <Center><Text fontSize="sm" color="black">中国/China</Text></Center>
          <Center><Text fontSize="sm" color="grey">¥{product.price_in_china}</Text></Center>
        </SimpleGrid>
      </LinkBox>
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
          <Product key={product.slug} categorySlug={categorySlug} product={product}></Product>
        ))}
        <Spacer />
      </SimpleGrid>
    </Center>
  )
}
