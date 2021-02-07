import { useState } from "react"
import { IoClose, IoMenu } from "react-icons/io5";

import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { Stack, Box, Flex, Text, Button, Link } from "@chakra-ui/react"

import Logo from "@components/Logo"

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  const { asPath } = useRouter()
  let myLink
  const myText = (
    <Text display="block" {...rest}>
      {children}
    </Text>
  )

  if (asPath.match(new RegExp(`^${to}(\/.*)?$`))) {
    myLink = <Button colorScheme="teal">{myText}</Button>
  } else {
    myLink = <Link>{myText}</Link>
  }

  return (
    <NextLink href={to}>
    {myLink}
    </NextLink>
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
          <MenuItem key={cat.slug} to={`/shop/${cat.slug}`}>{cat.name_cn}</MenuItem>
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

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return(
    <NavBarContainer {...props}>
      <Logo w="150px"/>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} categories={props.categories} />
    </NavBarContainer>
  )
}
