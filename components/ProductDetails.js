import { useContext, useState, useEffect } from 'react'
import S from "string"
import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select,
  Stat, StatNumber, Button, HStack, useNumberInput, Input, useColorModeValue
} from "@chakra-ui/react"
import { IoAddCircleSharp as AddIcon, IoRemoveCircleSharp as RemoveIcon } from "react-icons/io5";
import {
  CarouselContext, Dot, CarouselProvider, DotGroup, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { useShoppingCart } from 'use-shopping-cart'

export default function ProductDetails(props) {
  const { product, productVariants } = props
  const fallbackImage = "/product-fallback.jpeg"

  let selectedVariant = {}
  let sliders = []
  let dots = []

  const { cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()
  useEffect(() => cartDetails, [cartDetails])

  const addOrIncreaseCartItem = (e) => {
    if (cartDetails[selectedVariant.slug]) {
      incrementItem(selectedVariant.slug)
    } else {
      addItem(selectedVariant)
    }
  }

  const decrementIfHasItem = (e) => {
    if (cartDetails[selectedVariant.slug]) {
      decrementItem(selectedVariant.slug)
    }
  }

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1, defaultValue: cartDetails[selectedVariant.slug] ? cartDetails[selectedVariant.slug].quantity : 0, min: 0, precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps({ isReadOnly: true })

  const images = []
  const slideIndex = {}

  productVariants.forEach(pv => {
    slideIndex[pv.colour.slug] = images.length
    images.push(...pv.images)
  })

  images.forEach((image, index) => {
    sliders.push(<Slide key={index} index={index}><ImageWithZoom src={image.url}></ImageWithZoom></Slide>)
    dots.push(<Dot key={index} slide={index}><Center maxW={100}><Image src={image.url} /></Center></Dot>)
  })


  const selectVariantSize = (e) => {
    selectedVariant.id = `${selectedVariant.id}${e.target.value}`
  }

  const FormControlColour = ({productVariants, slideIndex}) => {
    const carouselContext = useContext(CarouselContext)
    const [currentSlide, setCurrentSlide] = useState(carouselContext && carouselContext.state.currentSlide)

    const selectVariant = (e) => {
      const variant = productVariants.filter(pv => pv.colour.slug === e.target.value)[0]
      selectedVariant = {
        id: variant.slug,
        price: variant.gbp_in_uk || product.gbp_in_uk,
        image: variant.images[0].url,
        colour: variant.colour.slug
      }

      carouselContext.setStoreState({ currentSlide: slideIndex[selectedVariant.colour]})
      console.log(selectedVariant)
    }

    const label = "colour"
    return (
      <FormControl py={2} isRequired id={label}>
        <FormLabel>{S(label).humanize().titleCase().s}</FormLabel>
        <Select placeholder={`Select ${label}`} onChange={selectVariant}>
          {productVariants.map(pv => (
            <option key={pv.colour.slug} value={pv.colour.slug}>
              {S(pv.colour.slug).humanize().titleCase().s}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <CarouselProvider naturalSlideWidth={300} naturalSlideHeight={400} infinite={true}
      visibleSlides={1} totalSlides={images.length} hasMasterSpinner lockOnWindowScroll>
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
            <FormControlColour productVariants={productVariants} slideIndex={slideIndex} />
            <HStack spacing={4} py={2}>
              <Stat maxW={40}>
                <StatNumber color="black">£{selectedVariant.gbp_in_uk}</StatNumber>
              </Stat>
              <HStack maxW="150px">
                <Box onClick={addOrIncreaseCartItem} {...inc}><AddIcon size="2em" /></Box>
                <Input {...input} suppressHydrationWarning />
                <Box onClick={decrementIfHasItem} {...dec} suppressHydrationWarning><RemoveIcon size="2em" /></Box>
              </HStack>
            </HStack>
          </Box>
        </SimpleGrid>
      </Center>
    </CarouselProvider>
  )
}
