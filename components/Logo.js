import { Text, Image, HStack, Link } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Link href="/">
      <HStack {...props}>
        <Image maxW="100px" src="/kissy-logo.svg" alt="Kissy Logo"/>
        <Text fontSize="xl" fontWeight="bold">如吻@uk</Text>
      </HStack>
    </Link>
  )
}
