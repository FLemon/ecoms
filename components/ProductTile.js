import {
  Box, Center, useColorModeValue, Heading, Text, Stack, Image
} from '@chakra-ui/react';
import { formatCurrencyString } from 'use-shopping-cart'
import S from "string"

export default function ProductSimple({ product }) {
  const imageSrc = product.images && product.images[0] && product.images[0].url || "/product-fallback.jpeg"
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        h={350}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${imageSrc})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={imageSrc}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Center h={10}>
            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
              {S(product.slug).humanize().titleCase().s}
            </Heading>
          </Center>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {formatCurrencyString({value: product.gbp_in_uk * 100, currency: "GBP"})}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}