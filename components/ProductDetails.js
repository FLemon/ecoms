import { useContext, useState, useEffect } from 'react'
import S from "string"
import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select,
  Stat, StatNumber, Button, HStack, useNumberInput, Input, useColorModeValue, Heading, Link, Badge
} from "@chakra-ui/react"
import { IoAddOutline as AddIcon, IoRemoveOutline as RemoveIcon } from "react-icons/io5";
import {
  CarouselProvider, CarouselContext, Dot, DotGroup, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const transformVariant = ({variant, size, product}) => {
  let result = { currency: "GBP" }
  if (variant) {
    const variantPrice = variant.gbp_in_uk || product.gbp_in_uk
    const variantSize = size || variant.sizes[0] && variant.sizes[0].slug
    result = {
      name: product.slug,
      id: variantSize && `${variant.slug}-${variantSize}`,
      colour: variant.colour.slug,
      size: variant.sizes[0] && variant.sizes[0].slug,
      sizes: variant.sizes.filter(s => s.quantity > 0),
      price: variantPrice*100,
      image: variant.images[0].url,
      limitedEdition: variant.limited_edition,
      ...result
    }
  }
  return result
}

export default function ProductDetails(props) {
  const { slideIndex, images, product, productVariants } = props
  if (productVariants.length === 0) {
    return (
      <Center>
        Coming soon
      </Center>
    )
  }
  const [currentVariantQuantityInCart, setCurrentVariantQuantityInCart] = useState(0)
  const [currentVariant, setCurrentVariant] = useState(transformVariant({
    variant: productVariants[0],
    product: product
  }))
  const [colour, setColour] = useState(currentVariant.colour)
  const [size, setSize] = useState(currentVariant.size)
  const carouselContext = useContext(CarouselContext)
  let subCarouselContext
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide)
  const { cartCount, cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()

  const colours = productVariants.map(pv => ({
    colour: pv.colour.slug,
    limited: pv.limited_edition
  }))

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
    setCurrentVariantQuantityInCart(cartDetails[currentVariant.id] ? cartDetails[currentVariant.id].quantity : 0)
  }, [cartCount, currentVariant])

  const fallbackImage = "/product-fallback.jpeg"
  let sliders = []
  let dots = []

  images.forEach((image, index) => {
    sliders.push(<Slide key={index} index={index}><ImageWithZoom src={image.url}></ImageWithZoom></Slide>)
    dots.push(<Dot key={index} slide={index}><Center maxW={100}><Image src={image.url} /></Center></Dot>)
  })

  const FormControls = ({type, value, options, onChange, limited}) => {
    if (options.length === 0) {
      return (
        <Box>no stock</Box>
      )
    }
    const ColourOptions = () => {
      return options.map(option => (
        <option key={option.colour} value={option.colour}>
          {`${S(option.colour).humanize().titleCase().s} ${option.limited ? "(Limited Edition)" : ""}`}
        </option>
      ))
    }

    const SizeOptions = () => {
      return options.map(v => (
        <option key={v} value={v}>{v.toUpperCase()}</option>
      ))
    }

    return (
      <FormControl py={2} isRequired id={type}>
        <FormLabel>{S(type).humanize().titleCase().s}</FormLabel>
        <Select onChange={onChange} value={value}>
          {type === "colour" ? <ColourOptions /> : <SizeOptions />}
        </Select>
      </FormControl>
    )
  }

  const SubSlider = () => {
    const subCarouselContext = useContext(CarouselContext)
    useEffect(() => {
      subCarouselContext.setStoreState({ currentSlide: slideIndex[colour] })
    }, [colour])

    const selectImage = (e) => {
      carouselContext.setStoreState({ currentSlide: e.target.getAttribute("index") })
    }

    return (
      <Slider>
        {images.map((image, index) => (
          <Link key={index}>
            <Slide onClick={selectImage}>
              <Center h="100%"><Image index={index} px="2px" src={image.url}/></Center>
            </Slide>
          </Link>
        ))}
      </Slider>
    )
  }

  const addOrIncreaseCartItem = (e) => {
    if (!currentVariant.size) { return }
    if (currentVariantQuantityInCart > 0) {
      incrementItem(currentVariant.id)
    } else {
      addItem(currentVariant)
    }
  }

  const decrementIfHasItem = (e) => {
    if (currentVariantQuantityInCart > 0) {
      decrementItem(currentVariant.id)
    }
  }

  return (
    <Center>
      <SimpleGrid columns={{sm: 1, md: 2}} spacing="4" p={2}>
        <Box>
          <SimpleGrid w="350px" columns={1} spacing="4px">
            <Box px="10px">
              <Slider>{sliders}</Slider>
            </Box>
            <CarouselProvider h="100%" naturalSlideWidth={400} naturalSlideHeight={450} infinite={true}
              visibleSlides={4} totalSlides={images.length}>
              <Box pos="relative">
                <ButtonBack>
                  <Center z-index="1" pos="absolute" top="0" h="100%" w="20px" left="0" bg="white" opacity="80%" align="middle">
                    {`<`}
                  </Center>
                </ButtonBack>
                <SubSlider />
                <ButtonNext>
                  <Center pos="absolute" top="0" h="100%" w="20px" right="0" bg="white" opacity="80%" align="middle">
                    {`>`}
                  </Center>
                </ButtonNext>
              </Box>
            </CarouselProvider>
          </SimpleGrid>
        </Box>
        <Box>
          <Heading>
            {S(currentVariant.name).humanize().titleCase().s}
          </Heading>
          <FormControls type="colour" value={colour} onChange={e => setColour(e.target.value)} options={colours} limited={currentVariant.limitedEdition}/>
          <FormControls type="size" value={size} onChange={e => setSize(e.target.value)} options={currentVariant.sizes.map(s => s.slug)}/>
          <HStack spacing={4} py={2}>
            <Stat maxW={40}>
              <StatNumber textAlign="center" color="black">
                {formatCurrencyString({value: currentVariant.price, currency: currentVariant.currency})}
              </StatNumber>
            </Stat>
            <HStack maxW="150px">
              <Button bg="" size="2em" _hover={{ bg: useColorModeValue("red.300", "red.400") }}
                onClick={addOrIncreaseCartItem} disabled={currentVariant.size ? false : true} suppressHydrationWarning>
                <AddIcon size="2em"/>
              </Button>
              <Input defaultValue={currentVariantQuantityInCart} suppressHydrationWarning/>
              <Button bg="" size="2em" _hover={{ bg: useColorModeValue("red.300", "red.400") }}
                onClick={decrementIfHasItem} disabled={currentVariantQuantityInCart === 0}>
                <RemoveIcon size="2em" />
              </Button>
            </HStack>
          </HStack>
          {currentVariant.limitedEdition && <Badge variant="solid" colorScheme="red">Limited Edition</Badge>}
        </Box>
      </SimpleGrid>
    </Center>
  )
}
