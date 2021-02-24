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

const transformVariant = ({variant, size, product}) => {
  const variantSize = size || "m"
  const variantPrice = variant.gbp_in_uk || product.gbp_in_uk
  return {
    id: `${variant.slug}-${variantSize}`,
    colour: variant.colour.slug,
    size: variantSize,
    sizes: ["s", "m", "l", "xl", "xxl", "xxxl"].filter(s => variant[s] > 0),
    price: variantPrice
  }
}

export default function ProductDetails(props) {
  const { slideIndex, images, product, productVariants } = props
  const [currentVariant, setCurrentVariant] = useState(transformVariant({
    variant: productVariants[0],
    product: product
  }))
  const [colour, setColour] = useState(currentVariant.colour)
  const [size, setSize] = useState(currentVariant.size)
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide)
  const { cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()

  const colours = productVariants.map(pv => (pv.colour.slug))

  useEffect(() => {
    carouselContext.setStoreState({ currentSlide: slideIndex[colour] })

    setCurrentVariant(transformVariant({
      variant: productVariants.filter(pv => pv.colour.slug === colour)[0],
      product: product,
      size
    }))
  }, [colour])

  useEffect(() => {
    setCurrentVariant(transformVariant({
      variant: productVariants.filter(pv => pv.colour.slug === colour)[0],
      product: product,
      size
    }))
  }, [size])

  useEffect(() => {
    console.log(currentVariant)
  }, [currentVariant])

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

  images.forEach((image, index) => {
    sliders.push(<Slide key={index} index={index}><ImageWithZoom src={image.url}></ImageWithZoom></Slide>)
    dots.push(<Dot key={index} slide={index}><Center maxW={100}><Image src={image.url} /></Center></Dot>)
  })

  const FormControls = ({type, value, options, onChange}) => {
    return (
      <FormControl py={2} isRequired id={type}>
        <FormLabel>{S(type).humanize().titleCase().s}</FormLabel>
        <Select onChange={onChange} value={value}>
          {options.map(v => (
            <option key={v} value={v}>
              {type === "colour" ? S(v).humanize().titleCase().s : v.toUpperCase()}
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
          <FormControls type="colour" value={colour} onChange={e => setColour(e.target.value)} options={colours}/>
          <FormControls type="size" value={size} onChange={e => setSize(e.target.value)} options={currentVariant.sizes}/>
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
