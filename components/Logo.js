import { SimpleGrid, Box, Text, Image } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <SimpleGrid columns={2} {...props}>
      <Image maxW={200} src="/kissy-logo.svg" alt="Kissy Logo"/>
    </SimpleGrid>
  )
}
