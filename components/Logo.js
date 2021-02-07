import { Box, Text, Image } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Box {...props}>
      <Image src="/kissy-logo.svg" alt="Kissy Logo"/>
      <Text colorScheme='gray' fontSize="lg" fontWeight="bold">•AMY UK</Text>
    </Box>
  )
}
