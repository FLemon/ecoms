import {
  Box, useColorModeValue, SimpleGrid, Link, Stack
} from "@chakra-ui/react"

import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'

export default function Post(props) {
  const { post } = props
  return (
    <SimpleGrid columns={1} spacing="4" p={2}>
      {post.section && post.section.length > 0 && post.section.map((sec, index) => (
        <Box
          key={index}
          mx="auto"
          p={8}
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue("white", "gray.800")}
          maxW="4xl"
        >
          <Stack spacing={4}>
            <Link fontSize="xl" fontWeight="bold" mb={1}
              _hover={{
                color: useColorModeValue("gray.600", "gray.200"),
                textDecor: "underline",
              }}
            >{sec.header}</Link>
            <ReactMarkdown renderers={ChakraUIRenderer()} source={sec.content} escapeHtml={false} />
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  )
}
