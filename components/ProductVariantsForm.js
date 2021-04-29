import { useContext, useState, useEffect } from 'react'
import {
  Box, Select,
  Stat, StatNumber, Button, HStack, Input, useColorModeValue, Heading, Text
} from "@chakra-ui/react"
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { IoAddOutline as AddIcon, IoRemoveOutline as RemoveIcon } from "react-icons/io5";
import { CarouselContext } from "pure-react-carousel"
import S from "string"
import SizeGuide from '@components/SizeGuide'
import RadioSelect from '@components/RadioSelect'

const transformVariant = ({variant, size, product}) => {
  let result = { currency: product.currency.toUpperCase() }
  if (variant) {
    const variantPrice = variant.price || product.price
    const variantSize = variant.sizes.includes(size) && size || variant.sizes[0] && variant.sizes[0].slug
    result = {
      name: product.slug,
      id: variantSize && `${variant.slug}-${variantSize}`,
      color: variant.colour.slug,
      size: variantSize,
      sizes: variant.sizes.filter(s => s.quantity > 0),
      price: variantPrice*100,
      image: variant.images[0] && variant.images[0].url,
      limitedEdition: variant.limited_edition,
      ...result
    }
  }
  return result
}

export default function ProductVariantsForm({productVariants, product, slideIndex, posts}) {
  const [currentVariantQuantityInCart, setCurrentVariantQuantityInCart] = useState(0)
  const [currentVariant, setCurrentVariant] = useState(transformVariant({
    variant: productVariants[0],
    product: product
  }))
  const [color, setColor] = useState(currentVariant.color)
  const [size, setSize] = useState(currentVariant.size)
  const { cartCount, cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()
  const fallbackImage = "/product-fallback.jpeg"
  const carouselContext = useContext(CarouselContext)

  useEffect(() => {
    carouselContext.setStoreState({ currentSlide: slideIndex[color] })

    setCurrentVariant(transformVariant({
      variant: productVariants.filter(pv => pv.colour.slug === color)[0],
      product: product,
      size
    }))
  }, [color])

  useEffect(() => {
    setCurrentVariant(transformVariant({
      variant: productVariants.filter(pv => pv.colour.slug === color)[0],
      product: product,
      size
    }))
  }, [size])

  useEffect(() => {
    setCurrentVariantQuantityInCart(cartDetails[currentVariant.id] ? cartDetails[currentVariant.id].quantity : 0)
  }, [cartCount, currentVariant])

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

  const colors = productVariants.map(pv => ({
    slug: pv.colour.slug,
    name: pv.colour.name,
    hex: pv.colour.hex,
    limited: pv.limited_edition
  }))

  return (
    <Box>
      <Heading mb={3}>
        {S(currentVariant.name).humanize().titleCase().s}
        {currentVariant.limitedEdition && <Text fontSize="sm" color="pink.400" textTransform={'uppercase'}>Limited Edition</Text>}
      </Heading>
      <RadioSelect type="color" options={colors} currentValue={color}
        onChange={val => setColor(val)}
      />
      <RadioSelect type="size" options={currentVariant.sizes} currentValue={size}
        onChange={val => setSize(val)}
      />
      <HStack p={2} mb={2}>
        <Box pr={10}>
          <Stat>
            <StatNumber fontFamily="Arial, Helvetica, sans-serif" color="black">
              {formatCurrencyString({value: currentVariant.price, currency: currentVariant.currency})}
            </StatNumber>
          </Stat>
        </Box>
        <HStack maxW="150px">
          <Button bg="" size="2em" _hover={{ bg: useColorModeValue("pink.300", "pink.400") }}
            onClick={addOrIncreaseCartItem} disabled={currentVariant.size ? false : true} suppressHydrationWarning>
            <AddIcon size="2em"/>
          </Button>
          <Input defaultValue={currentVariantQuantityInCart} suppressHydrationWarning disabled/>
          <Button bg="" size="2em" _hover={{ bg: useColorModeValue("pink.300", "pink.400") }}
            onClick={decrementIfHasItem} disabled={currentVariantQuantityInCart === 0}>
            <RemoveIcon size="2em" />
          </Button>
        </HStack>
      </HStack>
      <SizeGuide posts={posts}/>
    </Box>
  )
}
