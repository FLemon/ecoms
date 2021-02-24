import { useContext, useState, useEffect } from 'react'
import S from "string"
import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select,
  Stat, StatNumber, Button, HStack, useNumberInput, Input, useColorModeValue
} from "@chakra-ui/react"
import { IoAddCircleSharp as AddIcon, IoRemoveCircleSharp as RemoveIcon } from "react-icons/io5";
import {
  CarouselContext, Dot, DotGroup, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { useShoppingCart } from 'use-shopping-cart'

export default function ProductDetails(props) {
  const { slideIndex, images, product, productVariants } = props
  const [currentVariant, setCurrentVariant] = useState({
    id: `${productVariants[0]}-m`,
    colour: productVariants[0].colour.slug,
    size: "m",
    price: productVariants[0].gbp_in_uk || product.gbp_in_uk
  })
  const [colour, setColour] = useState(currentVariant.colour)
  const [size, setSize] = useState(currentVariant.size)
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide)
  carouselContext.setStoreState({ currentSlide: slideIndex[colour] })
  const { cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()

  const fallbackImage = "/product-fallback.jpeg"
  let sliders = []
  let dots = []

  const addOrIncreaseCartItem = (e) => {
    if (cartDetails[currentVariant.slug]) {
      incrementItem(currentVariant.slug)
    } else {
      addItem(currentVariant)
    }
  }

  const decrementIfHasItem = (e) => {
    if (cartDetails[currentVariant.slug]) {
      decrementItem(currentVariant.slug)
    }
  }

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1, defaultValue: cartDetails[currentVariant.slug] ? cartDetails[currentVariant.slug].quantity : 0, min: 0, precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps({ isReadOnly: true })

  const selectVariantSize = (e) => {
    setSize(e.target.value)
  }

  images.forEach((image, index) => {
    sliders.push(<Slide key={index} index={index}><ImageWithZoom src={image.url}></ImageWithZoom></Slide>)
    dots.push(<Dot key={index} slide={index}><Center maxW={100}><Image src={image.url} /></Center></Dot>)
  })

  const FormControlColour = () => {
    const selectColour = (e) => {
      setColour(e.target.value)
    }

    const label = "colour"
    return (
      <FormControl py={2} isRequired id={label}>
        <FormLabel>{S(label).humanize().titleCase().s}</FormLabel>
        <Select onChange={selectColour} value={colour}>
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
          <FormControlColour />
          <HStack spacing={4} py={2}>
            <Stat maxW={40}>
              <StatNumber color="black">£{currentVariant.price}</StatNumber>
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
  )
}
