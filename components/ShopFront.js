import {
  Flex, Box, SimpleGrid, Heading, Text, Button, useColorModeValue, Link,
  Center, VStack, useBreakpointValue, Stack
} from "@chakra-ui/react"
import Gallery from "react-photo-gallery";
import S from "string"
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import Banner from '@components/Banner'

export default function ShopFront(props) {
  return (
    <Center>
      <Banner />
    </Center>
  )
}
