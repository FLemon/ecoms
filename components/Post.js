import {
  Box, useColorModeValue, SimpleGrid, Link, Heading, Stack, Image, Center, Button
} from "@chakra-ui/react"
import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot, DotGroup
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import S from "string"
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

const Section = ({section}) => {
  let sliders = []
  let dots = []
  const mySlides = section.images && section.images.length ? section.images : new Array([])
  mySlides.forEach((image, index) => {
    sliders.push(
      <Slide key={index} index={index}>
        <Center h="100%"><Image index={index} px="2px" src={image.url}/></Center>
      </Slide>
    )
    dots.push(
      <Dot key={index} slide={index}>
        <Box cursor="pointer" boxSize={["7px", , "15px"]} m="0 2px" rounded="50%"
          bg="lightgrey" display="inline-block" transition="background-color 0.6s ease">
        </Box>
      </Dot>
    )
  })
  return (
    <Center px={10}>
      <Stack direction="column" w="full">
        <Box pt={2}>
          <Heading>{S(section.header).humanize().titleCase().s}</Heading>
          <ReactMarkdown renderers={ChakraUIRenderer()} source={section.content} escapeHtml={false} />
        </Box>
        <Box pos="relative">
          <CarouselProvider h="100%" naturalSlideWidth={400} naturalSlideHeight={450} infinite={true}
            visibleSlides={1} totalSlides={sliders.length}>
            <Box pos="relative">
              <Slider>{sliders}</Slider>
              <ButtonBack>
                <Center z-index={99} pos="absolute" top="0" h="100%" w="20px" left="0" bg="white" opacity="80%" align="middle">
                  {`<`}
                </Center>
              </ButtonBack>
              <ButtonNext>
                <Center z-index={99} pos="absolute" top="0" h="100%" w="20px" right="0" bg="white" opacity="80%" align="middle">
                  {`>`}
                </Center>
              </ButtonNext>
            </Box>
            <Center><DotGroup>{dots}</DotGroup></Center>
          </CarouselProvider>
        </Box>
      </Stack>
    </Center>
  )
}

export default function Post(props) {
  const { post } = props
  return (
    <>
      {post && post.section && post.section.length && post.section.map(section => (
        <Section key={section.header} section={section} />
      ))}
    </>
  )
}
