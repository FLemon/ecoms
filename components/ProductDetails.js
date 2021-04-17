import { useState, useEffect } from 'react'
import S from "string"
import {
  Center, GridItem, Grid, SimpleGrid, Flex, Spacer, Box, Image, FormControl, FormLabel, Select,
  Stat, StatNumber, Button, HStack, useNumberInput, Input, useColorModeValue, Heading, Link, Text
} from "@chakra-ui/react"
import { IoAddOutline as AddIcon, IoRemoveOutline as RemoveIcon } from "react-icons/io5";
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import SizeGuide from '@components/SizeGuide'
import ProductCarousel from '@components/ProductCarousel'

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
      image: variant.images[0] && variant.images[0].url,
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
  const { cartCount, cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()
  const fallbackImage = "/product-fallback.jpeg"

  const colours = productVariants.map(pv => ({
    colour: pv.colour.slug,
    limited: pv.limited_edition
  }))

  useEffect(() => {
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

  const FormControls = ({type, value, options, onChange, limited}) => {
    if (options.length === 0) {
      return (
        <Box>no stock</Box>
      )
    }
    const ColourOptions = () => {
      return options.map(option => (
        <option key={option.colour} value={option.colour}>
          {S(option.colour).humanize().titleCase().s} {option.limited ? "(Limited Edition)" : ""}
        </option>
      ))
    }

    const SizeOptions = () => {
      return options.map(v => (
        <option key={v} value={v}>{v.replace("-", "/").toUpperCase()}</option>
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
    <Center p={2}>
      <SimpleGrid w={{base:"full", md:"60%"}} columns={{sm: 1, md: 2}} spacing="2">
        <ProductCarousel images={images} slideIndex={slideIndex} />
        <Box>
          <Heading mb={3}>
            {S(currentVariant.name).humanize().titleCase().s}
            {currentVariant.limitedEdition && <Text fontSize="sm" color="pink.400" textTransform={'uppercase'}>Limited Edition</Text>}
          </Heading>
          <FormControls type="colour" value={colour} onChange={e => setColour(e.target.value)}
            options={colours} limited={currentVariant.limitedEdition}/>
          <FormControls type="size" value={size} onChange={e => setSize(e.target.value)} options={currentVariant.sizes.map(s => s.slug)}/>
          <HStack spacing={4} py={2} mb={2}>
            <Stat maxW={40}>
              <StatNumber textAlign="center" color="black">
                {formatCurrencyString({value: currentVariant.price, currency: currentVariant.currency})}
              </StatNumber>
            </Stat>
            <HStack maxW="150px">
              <Button bg="" size="2em" _hover={{ bg: useColorModeValue("pink.300", "pink.400") }}
                onClick={addOrIncreaseCartItem} disabled={currentVariant.size ? false : true} suppressHydrationWarning>
                <AddIcon size="2em"/>
              </Button>
              <Input defaultValue={currentVariantQuantityInCart} suppressHydrationWarning/>
              <Button bg="" size="2em" _hover={{ bg: useColorModeValue("pink.300", "pink.400") }}
                onClick={decrementIfHasItem} disabled={currentVariantQuantityInCart === 0}>
                <RemoveIcon size="2em" />
              </Button>
            </HStack>
          </HStack>
          <SizeGuide posts={props.posts}/>
        </Box>
      </SimpleGrid>
    </Center>
  )
}
