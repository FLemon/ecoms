import { useState, useRef, useEffect } from "react"
import { IoAddCircleSharp as AddIcon, IoRemoveCircleSharp as RemoveIcon } from "react-icons/io5";
import {
  Image, Stack, Input, HStack, useNumberInput, Text, AspectRatio, VStack, Center, Divider, Spacer,
  useDisclosure, Box, SimpleGrid, IconButton, Button, Flex, Heading, Stat, StatNumber, StatLabel,
  Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerFooter,
  Link
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import axios from "axios"
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { loadStripe } from '@stripe/stripe-js'
import { IoCartOutline } from "react-icons/io5"
import S from "string"

export default function Checkout(props) {
  const [cartEmpty, setCartEmpty] = useState(true)
  const {
    totalPrice, cartCount, clearCart, cartDetails,
    addItem, incrementItem, decrementItem
  } = useShoppingCart()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cartRef = useRef()

  const toCheckout = async (e) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
      if (cartCount > 0) {
        const response = await axios.post('/api/checkout', cartDetails)
        await stripe.redirectToCheckout({ sessionId: response.data.id });
      }
  }

  const CartItem = ({item}) => {
    const variantQuantityInCart = item ? item.quantity : 0
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
      step: 1, defaultValue: variantQuantityInCart, min: 0, precision: 0,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ isReadOnly: true })

    return (
      <>
        <Flex>
          <Center><Image w="80px" src={item.image}/></Center>
          <VStack maxH="150px" p={2}>
            <Heading as="h3" size="md">{S(item.name).humanize().titleCase().s}</Heading>
            <Stack>
              <Text>Colour: {S(item.colour).humanize().titleCase().s}</Text>
              <Text>Size: {item.size.toUpperCase()}</Text>
              <HStack spacing="10px">
                <Box onClick={() => incrementItem(item.id)} {...inc}><AddIcon size="1em" /></Box>
                <Input h="30px" w="60px" {...input} value={variantQuantityInCart} suppressHydrationWarning />
                <Box onClick={() => decrementItem(item.id)} {...dec} suppressHydrationWarning><RemoveIcon size="1em" /></Box>
                <Stat size="xs">
                  <StatNumber color="black">
                    {formatCurrencyString({value: item.price, currency: item.currency})}
                  </StatNumber>
                </Stat>
              </HStack>
            </Stack>
          </VStack>
        </Flex>
        <Divider />
      </>
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
            <DrawerHeader>
              <Text>My Basket<Link onClick={clearCart} p={4} as="samp" fontSize="xs">(clear)</Link></Text>
            </DrawerHeader>

            <DrawerBody>
              {Object.keys(cartDetails).map(id => <CartItem key={id} item={cartDetails[id]}/>)}
            </DrawerBody>

            <DrawerFooter>
              <Text px={4} fontSize="xl" color="black"><strong>Total: </strong>{formatCurrencyString({value: totalPrice, currency: "GBP"})}</Text>
              <Button onClick={toCheckout} color="blue" isDisabled={cartCount === 0}>Checkout</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
