import { Box, Text } from "@chakra-ui/react"
import Image from "next/image"

export default function Logo(props) {
  return (
    <Box {...props}>
      <Image src="/kissy-logo.svg" alt="Kissy Logo" width={100} height={23} layout="responsive"/>
      <Text colorScheme='gray' fontSize="lg" fontWeight="bold">@AMY.UK</Text>
    </Box>
  )
}
