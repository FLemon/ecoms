import { Text, Image, HStack, Link, useColorModeValue } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Link href="/"
    _hover={{}}>
      <HStack {...props}>
        <Image maxW="100px" src="/kissy-logo.svg" alt="Kissy Logo" fallbackSrc="/kissy-logo.svg" />
        <Text fontSize="xl" fontWeight="bold">如吻</Text>
      </HStack>
    </Link>
  )
}
