import { useState, useRef, useEffect } from "react"
import { IoAddCircleSharp as AddIcon, IoRemoveCircleSharp as RemoveIcon } from "react-icons/io5";
import {
  Image, Stack, Input, HStack, useNumberInput, Text, AspectRatio,
  useDisclosure, Box, SimpleGrid, IconButton, Button, Flex, Heading, Stat, StatNumber, Spacer,
  Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerFooter
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import axios from "axios"
import { useShoppingCart } from 'use-shopping-cart'
import { loadStripe } from '@stripe/stripe-js'
import { IoCartOutline } from "react-icons/io5"

export default function Checkout(props) {
  const [cartEmpty, setCartEmpty] = useState(true)
  const { formattedTotalPrice, cartCount, cartDetails, addItem, incrementItem, decrementItem } = useShoppingCart()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cartRef = useRef()

  const toCheckout = async (e) => {
    const router = useRouter()
    const stripeSessionId = router.query.stripe_session_id
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    if (data && data.paymentStatus === "unpaid") {
      await stripe.redirectToCheckout({ sessionId: stripeSessionId });
    } else {
      if (cartCount > 0) {
        const response = await axios.post('/api/checkout')
        await stripe.redirectToCheckout({ sessionId: response.data.id });
      } else {
      }
    }
  }

  useEffect(() => cartDetails, [cartDetails])

  const CartItem = ({item}) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
      step: 1, defaultValue: item.slug ? item.quantity : 0, min: 0, precision: 0,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ isReadOnly: true })

    const addOrIncreaseCartItem = (e) => {
      if (item.slug) {
        incrementItem(item.slug)
      } else {
        addItem({id: item.slug, image: item.images[0] && pitem.images[0].url, ...item})
      }
    }

    const decrementIfHasItem = (e) => {
      if (item.slug) {
        decrementItem(item.slug)
      }
    }

    return (
      <Stack key={item.slug}>
        <AspectRatio maxW="100px" ratio={4 / 3}>
          <Image objectFit="cover" src={item.image} />
        </AspectRatio>
        <Spacer />
        <Stack>
          <Flex>
            <Heading as="h1" size="md">{item.slug}</Heading>
            <Heading as="h2" size="sm">{item.name_cn}</Heading>
          </Flex>
          <Flex>
            <Text>Colour: {item.colour}</Text>
            <Text>Size: {item.size}</Text>
          </Flex>
          <Flex>
            <HStack spacing="10px">
              <Box onClick={addOrIncreaseCartItem} {...inc}><AddIcon size="2em" /></Box>
              <Input w="60px" {...input} suppressHydrationWarning />
              <Box onClick={decrementIfHasItem} {...dec} suppressHydrationWarning><RemoveIcon size="2em" /></Box>
            </HStack>
            <Spacer />
            <Stat maxW="50px">
              <StatNumber color="black">£{item.gbp_in_uk}</StatNumber>
            </Stat>
          </Flex>
        </Stack>
      </Stack>
    )
  }

  return(
    <>
      <IconButton ref={cartRef} onClick={onOpen} isRound size="md" icon={
        <>
          <IoCartOutline size="2em" />
          <Box as="span" pos="absolute" top={0} right={0} display="inline-flex" alignItems="center" justifyContent="center"
            px={2} py={1} fontSize="xs" fontWeight="bold" lineHeight="none" color="red.100" transform="translate(50%,-50%)"
            bg="red.600" rounded="full" suppressHydrationWarning
          >
            {cartCount}
          </Box>
        </>
      }>
      </IconButton>
      <Drawer isOpen={isOpen} size="xs" placement="right" onClose={onClose} finalFocusRef={cartRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>My Basket</DrawerHeader>

            <DrawerBody>
              {Object.keys(cartDetails).map(slug => <CartItem item={cartDetails[slug]}/>)}
            </DrawerBody>

            <DrawerFooter>
              Total: <Text>{formattedTotalPrice}</Text>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
