import {
  Flex, Box, SimpleGrid, Heading, Text, Button, useColorModeValue, Link,
  Center
} from "@chakra-ui/react"
import Gallery from "react-photo-gallery";
import S from "string"
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

export default function ShopFront(props) {
  const { categories } = props
  const Dialog = ({cat, bg}) => (
    <Box w={{base:"full", sm: "60%"}} bg={bg} p={5}>
      <Heading as="h2" mb={4} fontWeight="bold"
        letterSpacing="tight" lineHeight={{ md: "shorter" }}
        fontSize={{ base: "xl", md: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
        color={ bg === "white" ? useColorModeValue("red.300", "red.400") : "white"}
        textShadow="2px 0 currentcolor">
        {S(cat.slug).humanize().titleCase().s}
      </Heading>
      <Box fontSize={{ md: "md" }} mb={5} letterSpacing="tight" lineHeight={{ md: "shorter" }}
        textAlign={{ base: "left" }}
        color={ bg === "white" ? useColorModeValue("red.300", "red.350") : "white"}>
        <ReactMarkdown renderers={ChakraUIRenderer()} source={cat.description} escapeHtml={false} />
      </Box>
      <Button w={{ base: "full", sm: "auto" }} size="lg" as="a" href={`/shop/${cat.slug}`}
        bg={ bg === "white" ? useColorModeValue("red.300", "red.400") : "white"}
        _hover={{ bg: bg === "white" ? useColorModeValue("red.500", "red.700") : useColorModeValue("red.100", "red.200") }}
        color={ bg === "white" ? "white" : "red.300" }>
        View Products
      </Button>
    </Box>
  )

  const ImageBox = ({cat}) => {
    let photos = []
    cat.products.forEach(p => {
      p.product_variants.forEach(pv => {
        pv.images.map(i => {
          photos.push({
            src: i.url,
            width: i.width === i.height ? 1 : (i.width > i.height ? 16 : 9),
            height: i.width === i.height ? 1 : (i.width > i.height ? 9 : 16),
          })
        })
      })
    })
    return (
      <Box w={{ base: "full", sm: "40%" }} maxH="400px" overflowY="hidden" bg="white">
        {photos.length > 0 && (
          <Gallery margin={0} photos={photos} targetRowHeight={150}/>
        )}
      </Box>
    )
  }

  return (
    <Center>
      <Flex bg="white" p={{base: 5, md: 20}} justifyContent="center" alignItems="center">
        <Box shadow="xl" bg="white" px={8} py={20}>
          { categories && categories.length > 0 && categories.map((cat, index) => (
            <Flex mb={10} key={index} wrap="wrap" direction={index % 2 === 0 ? "row" : "row-reverse"}
              w={{ base: "xs", sm: "md", md: "2xl", lg: "6xl" }}>
              <Dialog cat={cat} bg={ index % 2 === 0 ? "red.300" : "white"}/>
              <ImageBox cat={cat}/>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Center>
  )
}
