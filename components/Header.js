import { useState } from "react"
import { IoClose, IoMenu } from "react-icons/io5";

import NextLink from 'next/link'

import { Divider, Spacer, SimpleGrid, Heading, Center, Stack, Box, Flex, Text, Button, Link } from "@chakra-ui/react"
import S from "String"

import Logo from "@components/Logo"

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  let myLink
  const myText = (
    <Text display="block" {...rest}>
      {children}
    </Text>
  )

  return (
    <NextLink href={to}><Link>{myText}</Link></NextLink>
  )
}

const MenuLinks = ({ isOpen, categories }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        {categories.map(cat => (
          <MenuItem key={cat.slug} to={`/shop/${cat.slug}`}>
            <Center><Text fontSize="lg">{S(cat.slug).humanize().titleCase().s}</Text></Center>
            <Center><Text fontSize="sm">({cat.name_cn})</Text></Center>
          </MenuItem>
        ))}
        <MenuItem to="/contact">Contact</MenuItem>
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

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      {...props}
    >
      {children}
    </Flex>
  )
}

const Breadcrumbs = (props) => {
  const { categorySlug, productSlug } = props

  let ProductCrumb = null

  if (productSlug) {
    ProductCrumb = (
      <>
        /
        <Spacer />
        <Link href={`/shop/${categorySlug}/${productSlug}`}>
          {S(productSlug).humanize().titleCase().s}
        </Link>
      </>
    )
  }

  const CategoryCrumb = (
    <>
      /
      <Spacer />
      <Link href={`/shop/${categorySlug}`}>
        {S(categorySlug).humanize().titleCase().s}
      </Link>
    </>
  )

  return (
    <Center maxW={200}>
      HOME
      <Spacer />
      {CategoryCrumb}
      <Spacer />
      {ProductCrumb}
    </Center>
  )
}

const Banner = (props) => {
  return (
    <SimpleGrid columns={4}>
      <Spacer />
      <Breadcrumbs {...props}/>
    </SimpleGrid>
  )
}
export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return(
    <SimpleGrid columns={1}>
      <NavBarContainer {...props}>
        <Logo w="150px"/>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} categories={props.categories} />
      </NavBarContainer>
      <Divider orientation="horizontal" />
      <Banner {...props}/>
      <Divider orientation="horizontal" />
    </SimpleGrid>
  )
}
