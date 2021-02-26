import { useContext, useState, useEffect } from 'react'
import S from "string"
import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select,
  Stat, StatNumber, Button, HStack, useNumberInput, Input, useColorModeValue, Heading, Link, IconButton
} from "@chakra-ui/react"
import { IoAddOutline as AddIcon, IoRemoveOutline as RemoveIcon } from "react-icons/io5";
import {
  CarouselProvider, CarouselContext, Dot, DotGroup, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'

const transformVariant = ({variant, size, product}) => {
  const variantSize = size || "m"
  const variantPrice = variant.gbp_in_uk || product.gbp_in_uk
  return {
    name: product.slug,
    id: `${variant.slug}-${variantSize}`,
    colour: variant.colour.slug,
    size: variantSize,
    sizes: ["s", "m", "l", "xl", "xxl", "xxxl"].filter(s => variant[s] > 0),
    price: variantPrice*100,
    currency: "GBP",
    image: variant.images[0].url
  }
}

export default function ProductDetails(props) {
  const { slideIndex, images, product, productVariants } = props
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
    setCurrentVariantQuantityInCart(cartDetails[currentVariant.id] ? cartDetails[currentVariant.id].quantity : 0)
  }, [cartCount, currentVariant])

  const fallbackImage = "/product-fallback.jpeg"
  let sliders = []
  let dots = []

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
      <SimpleGrid maxW={800} columns={{sm: 1, md: 2}} spacing="4" p={10}>
        <Box maxW={400}>
          <SimpleGrid columns={1} spacing="4px">
            <Box px="10px">
              <Slider>{sliders}</Slider>
            </Box>
            <CarouselProvider naturalSlideWidth={350} naturalSlideHeight={400} infinite={true}
              visibleSlides={4} totalSlides={images.length}>
              <Box pos="relative" maxW={400}>
                <SubSlider />
                <ButtonBack>
                  <Center pos="absolute" top="0" h="71px" w="20px" left="0" bg="white" opacity="80%" align="middle">
                    {`<`}
                  </Center>
                </ButtonBack>
                <ButtonNext>
                  <Center pos="absolute" top="0" h="71px" w="20px" right="0" bg="white" opacity="80%" align="middle">
                    {`>`}
                  </Center>
                </ButtonNext>
              </Box>
            </CarouselProvider>
          </SimpleGrid>
        </Box>
        <Box maxW={400}>
          <Heading>{S(currentVariant.name).humanize().titleCase().s}</Heading>
          <FormControls type="colour" value={colour} onChange={e => setColour(e.target.value)} options={colours}/>
          <FormControls type="size" value={size} onChange={e => setSize(e.target.value)} options={currentVariant.sizes}/>
          <HStack spacing={4} py={2}>
            <Stat maxW={40}>
              <StatNumber color="black">
                {formatCurrencyString({value: currentVariant.price, currency: currentVariant.currency})}
              </StatNumber>
            </Stat>
            <HStack maxW="150px">
              <Button bg="" size="2em" _hover={{ bg: useColorModeValue("red.300", "red.400") }}
                onClick={addOrIncreaseCartItem} suppressHydrationWarning>
                <AddIcon size="2em"/>
              </Button>
              <Input value={currentVariantQuantityInCart} suppressHydrationWarning/>
              <Button bg="" size="2em" _hover={currentVariantQuantityInCart > 0 && { bg: useColorModeValue("red.300", "red.400") }}
                onClick={decrementIfHasItem} disabled={currentVariantQuantityInCart === 0}>
                <RemoveIcon size="2em" />
              </Button>
            </HStack>
          </HStack>
        </Box>
      </SimpleGrid>
    </Center>
  )
}
