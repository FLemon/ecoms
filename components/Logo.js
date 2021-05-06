import { Center, Image, HStack, Link, useColorModeValue } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Center w={{base: "50vw", sm: "10vw", md: "15vw"}}>
      <Link href="/" _hover={{}}>
        <Image src="/kissy-logo.svg" alt="kissy ruwen" fallbackSrc="/fallback.jpg"/>
      </Link>
    </Center>
  )
}
