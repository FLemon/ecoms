import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select
} from "@chakra-ui/react"
import S from "String"
import { Dot, CarouselProvider, DotGroup, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

export default function ProductDetails(props) {
  const { product, categorySlug, productVariants, variantTypes } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.images[0] ? product.images[0].url : fallbackImage

  const variants = {}
  variantTypes.forEach(vt => {
    variants[vt.slug] = []
  })

  productVariants.forEach(pv => {
    pv.variants.forEach(v => {
      if (variants[v.variant_type.slug].indexOf(v.slug) === -1) {
        variants[v.variant_type.slug].push(v.slug)
      }
    })
  })

  let sliders = []
  let dots = []
  product.images.forEach((image, index) => {
    sliders.push(<Slide key={index} index={index}><ImageWithZoom src={image.url}></ImageWithZoom></Slide>)
    dots.push(<Dot key={index} slide={index}><Image maxW={50} src={image.url}></Image></Dot>)
  })

  return (
    <Flex>
      <Spacer />
      <Box maxW={600} p="6" rounded="md" bg="white">
        <SimpleGrid columns={2} spacing="4">
          <Box w={400}>
            <CarouselProvider naturalSlideWidth={300} naturalSlideHeight={400} infinite={true}
              visibleSlides={1} totalSlides={3} hasMasterSpinner lockOnWindowScroll>
              <Slider>{sliders}</Slider>
              <DotGroup>{dots}</DotGroup>
            </CarouselProvider>
          </Box>
          <Grid w={400} templateRows="repeat(5, 1ft)" templateColumns="repeat(2, 1fr)" gap={4}>
            {variantTypes.map(vt => (
              <GridItem w="100%" rowSpan={1} colSpan={1}>
                <FormControl isRequired maxW={200} id={vt.slug}>
                  <FormLabel>{S(vt.slug).humanize().titleCase().s}</FormLabel>
                  <Select placeholder={`Select ${vt.slug}`}>
                    {variants[vt.slug].map(v => (
                      <option key={v}>{S(v).humanize().titleCase().s}</option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            ))}
          </Grid>
        </SimpleGrid>
      </Box>
      <Spacer />
    </Flex>
  )
}
