import {
  Box, Link, Flex, useColorModeValue, chakra, SimpleGrid, Center, Heading, Button,
  Image, VStack
} from '@chakra-ui/react';
import S from "string"

export default function Collections({categories}) {
  const Dialog = ({cat, bg}) => (
    <Box w={{base:"full", sm: "40%"}} p={5}>
      <Heading as="h2" mb={4} fontWeight="bold"
        letterSpacing="tight" lineHeight={{ md: "shorter" }}
        fontSize={{ base: "xl", md: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
        color={useColorModeValue("pink.400", "pink.450")}
        textShadow="1px 0 currentcolor">
        {S(cat.slug).humanize().titleCase().s}
      </Heading>
      <Box fontSize={{ md: "md" }} mb={5} letterSpacing="tight" lineHeight={{ md: "shorter" }}
        textAlign={{ base: "left" }}
        color={useColorModeValue("pink.400", "pink.450")}>
        {cat.description}
      </Box>
      <Button boxShadow={'0 5px 20px 0px rgb(255 122 165 / 43%)'} w={{ base: "full", sm: "auto" }} size="lg" as="a" href={`/shop/${cat.slug}`}
        _hover={{ bg: useColorModeValue("pink.500", "pink.600") }}
        bg={useColorModeValue("pink.400", "pink.450")}
        color={ "white" }>
        Shop Products
      </Button>
    </Box>
  )

  const ImageBox = ({cat}) => {
    return (
      <Image
        w={{ base: "full", sm: "60%" }} rounded={'lg'}
        objectFit={'cover'}
        src={cat.images[0] ? cat.images[0].url : '/product-fallback.jpeg'}
      />
    )
  }

  return (
    <VStack spacing={8}>
      { categories && categories.length > 0 && categories.map((cat, index) => (
        <Flex mb={10} key={index} wrap="wrap" direction={index % 2 === 0 ? "row" : "row-reverse"}
          w={{ base: "xs", sm: "md", md: "2xl"}} alignItems="center">
          <ImageBox cat={cat}/>
          <Dialog cat={cat}/>
        </Flex>
      ))}
    </VStack>
  )
}
