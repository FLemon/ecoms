import { useState, useEffect } from "react"
import { IoClose, IoMenu, IoHome, IoChevronForward } from "react-icons/io5";
import { useRouter } from 'next/router'
import { useShoppingCart } from "use-shopping-cart"
import { loadStripe } from '@stripe/stripe-js'

import {
  Collapse, useColorModeValue, Divider, Spacer, SimpleGrid, Heading,
  Center, Stack, Box, Flex, Text, Link, Alert, AlertIcon, AlertDescription,
  AlertTitle, HStack
} from "@chakra-ui/react"
import S from "string"
import axios from "axios"
import useSWR from 'swr'

import Logo from "@components/Logo"
import Checkout from "@components/Checkout"

const MenuLinks = ({ isOpen, categories }) => {
  const router = useRouter()
  return (
    <Box
      bg='white'
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }} ml={5}
    >
      <Stack
        spacing={2}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {categories.map(cat => (
          <Link fontWeight="bold" rounded="md" key={cat.slug} href={`/shop/${cat.slug}`}
            alignItems="center" justifyContent="center" bg="white" px={5} py={3}
            color={router.asPath.match(`/shop/${cat.slug}/*`) && 'white'} borderWidth='1px' borderColor='white'
            bg={router.asPath.match(`/shop/${cat.slug}/*`) && useColorModeValue("red.300", "red.400")}
            _hover={{ borderColor: useColorModeValue("red.300", "red.400") }}>
            <Center><Text fontSize="lg">{S(cat.slug).humanize().titleCase().s}</Text></Center>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box ml={5} display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <IoClose /> : <IoMenu />}
    </Box>
  )
}

const NavBarContainer = ({ children }) => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap"
      w="100%" h="80px" py={2} px={8} pos="fixed" top={0} left={0}
      bg={["white", "white", "white", "white"]} zIndex={999}
      borderBottomWidth="1px" borderColor="grey.50"
    >
      {children}
    </Flex>
  )
}

const CheckoutAlert = () => {
  const { clearCart } = useShoppingCart()
  const router = useRouter()
  const stripeSessionId = router.query.stripe_session_id
  const checkoutSessionUrl = `/api/checkout_session/${stripeSessionId}`
  let alertStatus, alertMsg
  useEffect(() => {
    if (alertStatus === "success") {
      clearCart()
    }
  }, [alertStatus])

  const fetcher = async (url) => {
    if (stripeSessionId) {
      const res = await axios.get(url)
      return res.data
    } else {
      return {}
    }
  }

  const generateAlertProps = ({data, error}) => {
    if (error) {
      console.log(error)
      return ["error", error.message]
    }

    if (!data) {
      return ["", ""]
    }

    switch(data.paymentStatus) {
      case "paid":
        return ["success", "thank you for your payment"]
      case "unpaid":
        return ["warning", "payment canceled"]
      default:
        return ["", ""]
    }
  }

  [alertStatus, alertMsg] = generateAlertProps(useSWR(checkoutSessionUrl, fetcher))

  const returnCheckout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    await stripe.redirectToCheckout({ sessionId: stripeSessionId });
  }

  return (
    <Collapse in={alertStatus ? true : false} animateOpacity>
      {alertStatus && (
        <Alert alignItems="center" justifyContent="center" textAlign="center" status={alertStatus}>
          <AlertIcon />
          <AlertTitle>{S(alertMsg).humanize().titleCase().s}</AlertTitle>
          {alertStatus === "warning" ? <AlertDescription><Link onClick={returnCheckout}>return to your payment</Link></AlertDescription> : <></>}
        </Alert>
      )}
    </Collapse>
  )
}

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return(
    <SimpleGrid columns={1}>
      <NavBarContainer>
        <Spacer />
        <Logo/>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} categories={props.categories} />
        <Checkout />
        <Spacer />
      </NavBarContainer>
      <CheckoutAlert />
    </SimpleGrid>
  )
}
