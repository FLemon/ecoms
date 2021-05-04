import {
  Flex, Text, Button, VStack, useBreakpointValue, Stack, Link
} from "@chakra-ui/react"
import S from "string"

export default function Banner({banner}) {
  const section = banner.section[0]
  return (
    <Flex
      w={'full'}
      h={{ base:'28vh', md: '70vh' }}
      backgroundImage={`url(${section.images[0].url})`}
      backgroundSize='100%'
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            {section.header}
          </Text>
          <Text
            color={'white'}
            fontWeight={300}
            lineHeight={1}
            fontSize={useBreakpointValue({ base: 'md', md: '2xl' })}>
            {section.content}
          </Text>
          <Stack direction={'row'}>
            <Link href={`/shop/bras/${section.meta.slug}`} _hover={{textDecor: "none"}}>
              <Button boxShadow={'0 5px 20px 0px rgb(255 122 165 / 43%)'} bg={'pink.400'} rounded={'md'} color={'white'}
                _hover={{ bg: 'pink.500' }}>
              {S(section.meta.text).humanize().titleCase().s}
              </Button>
            </Link>
            <Link href="/shop/pages/about-us" _hover={{textDecor: "none"}}>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'md'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
                About The Brand
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}
