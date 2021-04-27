import { useState, useRef, useEffect } from "react"
import { IoAddOutline as AddIcon, IoRemoveOutline as RemoveIcon } from "react-icons/io5";
import {
  Image, Stack, Input, HStack, useNumberInput, Text, AspectRatio, VStack, Center, Divider, Spacer,
  useDisclosure, Box, SimpleGrid, IconButton, Button, Flex, Heading,
  Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerFooter,
  Link, useColorModeValue, Badge
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

  useEffect(() => {
    if (cartCount > 0) {
      const validateCart = async () => {
        const response = await axios.post('/api/checkout?validate_only=true', cartDetails)
        return response.data
      }
      validateCart()
    }
  }, [cartDetails])

  const toCheckout = async (e) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
      if (cartCount > 0) {
        const response = await axios.post('/api/checkout', cartDetails)
        await stripe.redirectToCheckout({ sessionId: response.data.id });
      }
  }

  const CartItem = ({item, quantity}) => {
    return (
      <>
        <Flex>
          <Center><Image w="80px" src={item.image}/></Center>
          <VStack p={2} spacing="4px">
            <VStack w="200px" fontWeight="bold" spacing="2px" align="left">
              <Heading size="md">
                {S(item.name).humanize().titleCase().s}
                {item.limitedEdition && <Badge fontSize="10pt" variant="solid" colorScheme="red">Limited Edition</Badge>}
              </Heading>
              <HStack>
                <Text fontSize="xs">Colour:</Text>
                <Text fontSize="xs" align="left">{S(item.color).humanize().titleCase().s}</Text>
              </HStack>
              <HStack>
                <Text fontSize="xs">Size:</Text>
                <Text fontSize="xs">{item.size.toUpperCase()}</Text>
              </HStack>
            </VStack>
            <HStack w="200px" spacing="2px">
              <Button bg="" onClick={() => incrementItem(item.id)} size="2.2em"
                _hover={{ bg: useColorModeValue("red.300", "red.400") }}>
                <AddIcon size="1.5em" />
              </Button>
              <Input h="30px" w="50px" readOnly value={quantity} suppressHydrationWarning />
              <Button bg="" onClick={() => decrementItem(item.id)} size="2.2em"
                _hover={{ bg: useColorModeValue("red.300", "red.400") }}>
                <RemoveIcon size="1.5em" />
              </Button>
              <Spacer />
              <Stack spacing={0}>
                <Box fontSize="12pt" color="black" align="right">
                  {formatCurrencyString({value: item.price * quantity, currency: item.currency})}
                </Box>
                {quantity > 1 &&
                  <Box fontSize="8pt" color="grey" align="right">
                    {formatCurrencyString({value: item.price, currency: item.currency})} each
                  </Box>
                }
              </Stack>
            </HStack>
          </VStack>
        </Flex>
      </>
    )
  }

  return(
    <>
      <IconButton bg="" _hover={{ bg: useColorModeValue("red.300", "red.400") }} ref={cartRef} onClick={onOpen}
        isRound size="md" icon={
          <>
            <IoCartOutline size="30px" />
            <Box as="span" pos="absolute" top={1} right={1} display="inline-flex" alignItems="center" justifyContent="center"
              px={2} py={1} fontSize="xs" fontWeight="bold" lineHeight="none" color="red.100" transform="translate(50%,-50%)"
              bg="red.600" rounded="full" suppressHydrationWarning
            >
              {cartCount}
            </Box>
          </>
        }
      >
      </IconButton>
      <Drawer isOpen={isOpen} size="xs" placement="right" onClose={onClose} finalFocusRef={cartRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text>My Basket<Link onClick={clearCart} p={4} as="samp" fontSize="xs">(clear)</Link></Text>
            </DrawerHeader>
            <Divider />

            <DrawerBody px="12px">
              {Object.keys(cartDetails).map(id => <CartItem key={id} item={cartDetails[id]} quantity={cartDetails[id].quantity}/>)}
            </DrawerBody>

            <Divider />
            <DrawerFooter p="8px">
              <Text px={4} fontSize="12pt" color="black"><strong>Total: </strong>{formatCurrencyString({value: totalPrice, currency: "GBP"})}</Text>
              <Spacer />
              <Button bg="red.300" borderRadius="lg" fontSize="14pt" onClick={toCheckout} color="white" fontWeight="bold"
                isDisabled={cartCount === 0} _hover={{ bg:"red.500" }}>
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
