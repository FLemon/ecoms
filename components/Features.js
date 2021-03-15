import {
  Flex, Box, SimpleGrid, Heading, Text, Button, useColorModeValue, Link,
  Center
} from "@chakra-ui/react"
import S from "string"

export default function Features(props) {
  const { categories } = props
  const Dialog = ({cat}) => (
    <Box>
      <Heading as="h2" mb={4}
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="extrabold"
        letterSpacing="tight"
        textAlign={{ base: "center", md: "left" }}
        color={useColorModeValue("white", "red.300")}
        lineHeight={{ md: "shorter" }}
        textShadow="2px 0 currentcolor">
        {S(cat.slug).humanize().titleCase().s}
      </Heading>
      <Text fontSize={{ md: "lg" }} mb={5}
        textAlign={{ base: "center", sm: "left" }}
        color={useColorModeValue("gray.600", "gray.400")}>
        {cat.description}
      </Text>
      <Button w={{ base: "full", sm: "auto" }} size="lg" as="a" href={`/shop/${cat.slug}`}
        bg={useColorModeValue("red.400", "gray.600")}
        _hover={{ bg: useColorModeValue("red.300", "red.500") }}
        color="white">
        View Products
      </Button>
    </Box>
  )

  const ImageBox = ({cat}) => (
    <Box w="full" h="full" py={48} bg={useColorModeValue("gray.200", "gray.700")}></Box>
  )

  return (
    <Flex bg="white" p={{base: 5, md: 20}} w="full" justifyContent="center" alignItems="center">
      <Box shadow="xl" bg={useColorModeValue("red.200", "red.300")} px={8} py={20} mx="auto">
        { categories && categories.length > 0 && categories.map((cat, index) => (
          <SimpleGrid key={index} mb={24} alignItems="start" columns={{ base: 1, md: 2 }}
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}>
            { index % 2 === 0 ?
              (
                <>
                  <Dialog cat={cat}/>
                  <ImageBox cat={cat}/>
                </>
              ) : (
                <>
                  <ImageBox cat={cat}/>
                  <Dialog cat={cat}/>
                </>
              )
            }
          </SimpleGrid>
        ))}
      </Box>
    </Flex>
  )
}
