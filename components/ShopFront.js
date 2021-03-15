import {
  Flex, Box, SimpleGrid, Heading, Text, Button, useColorModeValue, Link,
  Center
} from "@chakra-ui/react"
import Gallery from "react-photo-gallery";
import S from "string"

export default function ShopFront(props) {
  const { categories } = props
  const Dialog = ({cat}) => (
    <Box>
      <Heading as="h2" mb={4} fontWeight="extrabold"
        letterSpacing="tight" lineHeight={{ md: "shorter" }}
        fontSize={{ base: "2xl", md: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
        color={useColorModeValue("red.300", "red.400")}
        textShadow="2px 0 currentcolor">
        {S(cat.slug).humanize().titleCase().s}
      </Heading>
      <Text fontSize={{ md: "lg" }} mb={5}
        textAlign={{ base: "center", sm: "left" }}
        color={useColorModeValue("red.300", "red.350")}>
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

  const ImageBox = ({cat}) => {
    let photos = []
    cat.products.forEach(p => {
      p.images.map(i => {
        photos.push({
          src: i.url,
          width: i.width === i.height ? 1 : (i.width > i.height ? 4 : 3),
          height: i.width === i.height ? 1 : (i.width > i.height ? 3 : 4),
        })
      })
    })
    return (
      <Box w="full">
        {photos.length > 0 && <Gallery direction="column" columns={5} photos={photos} />}
      </Box>
    )
  }

  return (
    <Center>
      <Flex bg="white" p={{base: 5, md: 20}} w="80%" justifyContent="center" alignItems="center">
        <Box shadow="xl" bg="white" px={8} py={20}>
          <SimpleGrid mb={24} alignItems="center"
            columns={{ base: 1, md: 4 }}
            spacingY={{ base: 10, md: 32 }}
            spacingX={{ base: 10, md: 24 }}>
            { categories && categories.length > 0 && categories.map((cat, index) => (
              <>
                <Dialog cat={cat}/>
                <ImageBox cat={cat}/>
              </>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Center>
  )
}
