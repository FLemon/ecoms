import { Text, Image, HStack, Link } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Link href="/">
      <HStack {...props}>
        <Image maxW="100px" src="/kissy-logo.svg" alt="Kissy Logo" fallbackSrc="/kissy-logo.svg" />
        <Text fontSize="xl" fontWeight="bold">如吻</Text>
      </HStack>
    </Link>
  )
}
