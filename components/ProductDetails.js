import {
  Center, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select
} from "@chakra-ui/react"

export default function ProductDetails(props) {
  const { product, categorySlug, productVariants } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.images[0] ? product.images[0].url : fallbackImage

  console.log(productVariants)
  const VariantSelect = () => {
  }

  return (
    <Flex>
      <Spacer />
      <Box maxW={500} boxShadow="2xl" p="6" rounded="md" bg="white">
        <SimpleGrid columns={1} spacing="4">
          <Image src={imageSrc} fallbackSrc={fallbackImage}/>
          <Box>
            <SimpleGrid columns={2} spacing="4">
              <FormControl id="size">
                <SimpleGrid columns={2} spacing="4">
                  <Center><FormLabel>大小/Size</FormLabel></Center>
                  <Select placeholder="Select size">
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                  </Select>
                </SimpleGrid>
              </FormControl>
              <FormControl id="color">
                <SimpleGrid columns={2} spacing="4">
                  <Center><FormLabel>颜色/Colour</FormLabel></Center>
                  <Select placeholder="Select colour">
                    <option>中国红/Chinese Red</option>
                    <option>黑/Black</option>
                  </Select>
                </SimpleGrid>
              </FormControl>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Box>
      <Spacer />
    </Flex>
  )
}
