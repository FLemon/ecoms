import { useState } from "react"
import { IoClose, IoMenu } from "react-icons/io5";
import { useRouter } from 'next/router'

import {
  Collapse, useDisclosure, useColorModeValue, Divider, Spacer, SimpleGrid, Heading,
  Center, Stack, Box, Flex, Text, Button, Link, Alert, AlertIcon, AlertDescription,
  AlertTitle, CloseButton
} from "@chakra-ui/react"
import S from "string"
import axios from "axios"
import useSWR from 'swr'

import Logo from "@components/Logo"
import Checkout from "@components/Checkout"

const MenuLinks = ({ isOpen, categories }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={2}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {categories.map(cat => (
          <Link rounded="md" key={cat.slug} href={`/shop/${cat.slug}`}
            alignItems="center" justifyContent="center" bg="white" px={5} py={3}
            _hover={{ bg: useColorModeValue("red.300", "red.400") }}
          >
            <Center><Text fontSize="lg">{S(cat.slug).humanize().titleCase().s}</Text></Center>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <IoClose /> : <IoMenu />}
    </Box>
  )
}

const NavBarContainer = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
    >
      {children}
    </Flex>
  )
}

const CategoryCrumb = ({categorySlug}) => {
  return (
    <>
      /
      <Spacer />
      <Link href={`/shop/${categorySlug}`}>
        {S(categorySlug).humanize().titleCase().s}
      </Link>
    </>
  )
}

const ProductCrumb = ({categorySlug, productSlug}) => {
  if (productSlug) {
    return (
      <>
        /
        <Spacer />
        <Link href={`/shop/${categorySlug}/${productSlug}`}>
          {S(productSlug).humanize().titleCase().s}
        </Link>
      </>
    )
  }
  return <></>
}

const Breadcrumb = ({categorySlug, productSlug}) => {

  return (
    <SimpleGrid columns={{sm: 2, md:4}} p="4">
      <Spacer />
      <Center maxW={200}>
        HOME
        <Spacer />
        <CategoryCrumb categorySlug={categorySlug}/>
        <Spacer />
        <ProductCrumb categorySlug={categorySlug} productSlug={productSlug}/>
      </Center>
    </SimpleGrid>
  )
}

const CheckoutAlert = () => {
  const router = useRouter()
  const stripeSessionId = router.query.stripe_session_id
  let alertStatus, alertMsg

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
        return ["warning", "you have pending payment"]
      default:
        return ["info", "you have not started a purchase"]
    }
  }

  [alertStatus, alertMsg] = generateAlertProps(useSWR(`/api/checkout_session/${stripeSessionId}`, fetcher))

  return (
    <Collapse in={alertStatus ? true : false} animateOpacity>
      {alertStatus && (
        <Alert alignItems="center" justifyContent="center" textAlign="center" status={alertStatus}>
          <AlertIcon />
          <AlertTitle>{S(alertMsg).humanize().titleCase().s}</AlertTitle>
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
        <Logo w="150px"/>
        <Checkout />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} categories={props.categories} />
      </NavBarContainer>
      <CheckoutAlert />
      <Divider orientation="horizontal" />
      <Breadcrumb categorySlug={props.categorySlug} productSlug={props.productSlug} />
      <Divider orientation="horizontal" />
    </SimpleGrid>
  )
}
