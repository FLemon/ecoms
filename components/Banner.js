import {
  Flex, Text, Button, VStack, useBreakpointValue, Stack
} from "@chakra-ui/react"

export default function Banner(props) {
  return (
    <Flex
      w={'full'}
      h={{ base:'25vh', sm: '40vh' }}
      backgroundImage={
        'url(https://cdn.shopify.com/s/files/1/0326/2136/3331/files/IMG_8931.jpg?v=1617286190)'
      }
      backgroundSize='100%'
      backgroundPosition={'center center'}>
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
            Enjoy Kissy Moment
          </Text>
          <Text
            color={'white'}
            fontWeight={300}
            lineHeight={1}
            fontSize={useBreakpointValue({ base: 'md', md: '2xl' })}>
            A lifestyle brand inspired by fashion and comfort.
          </Text>
          <Stack direction={'row'}>
            <Button
              bg={'pink.400'}
              rounded={'md'}
              color={'white'}
              _hover={{ bg: 'pink.500' }}>
              Shop More
            </Button>
            <Button
              bg={'whiteAlpha.300'}
              rounded={'md'}
              color={'white'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              About The Brand
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}
