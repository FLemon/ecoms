import { Center, Image, HStack, Link, useColorModeValue } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Center w={{base: "50vw", sm: "10vw", md: "15vw"}}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}>
      <Link href="/" _hover={{}}>
        <Image src="/kissy-logo.svg" alt="Kissy Logo"/>
      </Link>
    </Center>
  )
}
