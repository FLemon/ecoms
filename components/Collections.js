import {
  Box, Link, Flex, useColorModeValue, chakra, SimpleGrid, Center, Heading, Button,
  Image,
} from '@chakra-ui/react';
import S from "string"

export default function Collections(props) {
  const { categories } = props
  const Dialog = ({cat, bg}) => (
    <Box w={{base:"full", sm: "60%"}} p={5}>
      <Heading as="h2" mb={4} fontWeight="bold"
        letterSpacing="tight" lineHeight={{ md: "shorter" }}
        fontSize={{ base: "xl", md: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
        color={useColorModeValue("pink.300", "pink.400")}
        textShadow="2px 0 currentcolor">
        {S(cat.slug).humanize().titleCase().s}
      </Heading>
      <Box fontSize={{ md: "md" }} mb={5} letterSpacing="tight" lineHeight={{ md: "shorter" }}
        textAlign={{ base: "left" }}
        color={useColorModeValue("pink.300", "pink.350")}>
        {cat.description}
      </Box>
      <Button w={{ base: "full", sm: "auto" }} size="lg" as="a" href={`/shop/${cat.slug}`}
        _hover={ useColorModeValue("pink.500", "pink.700")}
        bg={useColorModeValue("pink.300", "pink.350")}
        color={ "white" }>
        View Products
      </Button>
    </Box>
  )

  const ImageBox = ({cat}) => {
    return (
      <Image
        w={{ base: "full", sm: "40%" }} rounded={'lg'}
        objectFit={'cover'}
        src={cat.images[0] ? cat.images[0].url : '/product-fallback.jpeg'}
      />
    )
  }

  return (
    <Center>
      <Flex justifyContent="center" alignItems="center">
        <Box px={8}>
          { categories && categories.length > 0 && categories.map((cat, index) => (
            <Flex mb={10} key={index} wrap="wrap" direction={index % 2 === 0 ? "row" : "row-reverse"}
            w={{ base: "xs", sm: "md", md: "2xl", lg: "6xl" }} alignItems="center">
              <ImageBox cat={cat}/>
              <Dialog cat={cat}/>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Center>
  )
}
