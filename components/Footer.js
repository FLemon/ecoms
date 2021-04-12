import {
  Box, Container, Link, SimpleGrid, Stack, Text, Flex, Tag, useColorModeValue,
  Image
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Logo from "@components/Logo"
import S from "string"

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered(props) {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={5}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Category</ListHeader>
            {props.categories.map(cat => (
              <Link key={cat.slug} href={'#'}>{S(cat.slug).humanize().titleCase().s}</Link>
            ))}
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Contact Us</Link>
            <Link href={'#'}>Join Us</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Useful Links</ListHeader>
            <Link href={'#'}>How to Wash</Link>
            <Link href={'#'}>Return Policy</Link>
            <Link href={'#'}>Delivery Policy</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Contact</ListHeader>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={4}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2021 Kissy如吻. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
