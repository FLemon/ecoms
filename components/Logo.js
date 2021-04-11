import { Center, Image, HStack, Link, useColorModeValue } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Center w={{base: "50vw", sm: "10vw", md: "15vw"}}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}>
      <Link href="/" _hover={{}}>
        <Image src="http://rwkissy.com.au/wp-content/uploads/2020/07/kissy-logo-main.png" alt="Kissy Logo" fallbackSrc="/kissy-logo.svg" />
      </Link>
    </Center>
  )
}
