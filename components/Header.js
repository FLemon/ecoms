import { useState } from "react"
import { IoClose, IoMenu } from "react-icons/io5";

import { Divider, Spacer, SimpleGrid, Heading, Center, Stack, Box, Flex, Text, Button, Link } from "@chakra-ui/react"
import S from "string"

import Logo from "@components/Logo"

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
        <Link href="/">Home</Link>
        {categories.map(cat => (
          <Link key={cat.slug} href={`/shop/${cat.slug}`}>
            <Center><Text fontSize="lg">{S(cat.slug).humanize().titleCase().s}</Text></Center>
            <Center><Text fontSize="sm">({cat.name_cn})</Text></Center>
          </Link>
        ))}
        <Link href="/contact">Contact</Link>
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

const Banner = ({categorySlug, productSlug}) => {
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
export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return(
    <SimpleGrid columns={1}>
      <NavBarContainer>
        <Logo w="150px"/>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} categories={props.categories} />
      </NavBarContainer>
      <Divider orientation="horizontal" />
      <Banner categorySlug={props.categorySlug} productSlug={props.productSlug} />
      <Divider orientation="horizontal" />
    </SimpleGrid>
  )
}
