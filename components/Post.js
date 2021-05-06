import {
  Box, useColorModeValue, SimpleGrid, Link, Heading, Stack, Image, Center, Button
} from "@chakra-ui/react"
import S from "string"
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import Carousel from '@components/Carousel'

const Section = ({section}) => {
  return (
    <Center px={10} py={5}>
      <Stack direction="column" w="full">
        <Center><Heading as="h2">{S(section.header).humanize().titleCase().s}</Heading></Center>
        <Box fontSize="2xl">
          <ReactMarkdown renderers={ChakraUIRenderer()} source={section.content} escapeHtml={false} />
        </Box>
        {section.images.length && (<Center><Carousel slides={section.images}/></Center>)}
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
