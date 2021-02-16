import { useContext, useState } from 'react'
import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select
} from "@chakra-ui/react"
import S from "String"
import { CarouselContext, Dot, CarouselProvider, DotGroup, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

const FormControls = ({variantType, variants}) => {
  //TODO: use product variants image to control slide
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide)
  console.log("currentSlide")
  console.log(currentSlide)

  const selectSlide = (e) => {
    if (e.target.id === "colour") {
      console.log(e.target.value)
      carouselContext.setStoreState({ currentSlide: 1})
    }
  }

  return (
    <FormControl key={variantType.slug} isRequired id={variantType.slug}>
      <FormLabel>{S(variantType.slug).humanize().titleCase().s}</FormLabel>
      <Select placeholder={`Select ${variantType.slug}`} onChange={selectSlide}>
        {variants[variantType.slug].map(v => (
          <option key={v}>{S(v).humanize().titleCase().s}</option>
        ))}
      </Select>
    </FormControl>
  )
}

export default function ProductDetails(props) {
  const { product, categorySlug, productVariants, variantTypes } = props
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.images[0] ? product.images[0].url : fallbackImage
  const variants = {}
  let sliders = []
  let dots = []

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

  product.images.forEach((image, index) => {
    sliders.push(<Slide key={index} index={index}><ImageWithZoom src={image.url}></ImageWithZoom></Slide>)
    dots.push(<Dot key={index} slide={index}><Center maxW={100}><Image src={image.url} /></Center></Dot>)
  })

  return (
    <CarouselProvider naturalSlideWidth={300} naturalSlideHeight={400} infinite={true}
      visibleSlides={1} totalSlides={3} hasMasterSpinner lockOnWindowScroll>
      <Center>
        <SimpleGrid maxW={800} columns={{sm: 1, md: 2}} spacing="4" p={10}>
          <Box maxW={400}>
            <Slider>{sliders}</Slider>
            <DotGroup>
              <Spacer />
              <SimpleGrid columns={4} spacing={1}>
                {dots}
              </SimpleGrid>
            </DotGroup>
          </Box>
          <Box maxW={400}>
            {variantTypes.map(vt => (
              <FormControls variantType={vt} variants={variants} />
            ))}
          </Box>
        </SimpleGrid>
      </Center>
    </CarouselProvider>
  )
}
