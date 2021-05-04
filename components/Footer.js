import {
  Box, Container, Link, SimpleGrid, Stack, Text, Flex, Tag, useColorModeValue,
  Image, useDisclosure, ModalBody, ModalFooter, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, Button, Wrap, WrapItem, Center
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Logo from "@components/Logo"
import SocialButton from "@components/SocialButton"
import S from "string"
import { IoLogoInstagram, IoLogoWechat } from "react-icons/io5"

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered({ posts, categories }) {
  const supportPosts = ["delivery", "return-policy", "how-to-wash"]
  const companyPosts = ["about-us", "join-us", "product-details"]
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={5}>
          <SimpleGrid columns={{ base: 3, sm: 4 }} spacing={{base: 5, md: 1}}>
            <Stack align={'flex-start'}>
              <ListHeader>Category</ListHeader>
              {categories.map(cat => (
                <Link key={cat.slug} href={`/shop/${cat.slug}`}>{S(cat.slug).humanize().titleCase().s}</Link>
              ))}
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              {posts && posts.filter(post => companyPosts.includes(post.slug)).map(post => (
                <Link key={post.slug} href={`/shop/pages/${post.slug}`}>{S(post.slug).humanize().titleCase().s}</Link>
              ))}
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Support</ListHeader>
              {posts && posts.filter(post => supportPosts.includes(post.slug)).map(post => (
                <Link key={post.slug} href={`/shop/pages/${post.slug}`}>{S(post.slug).humanize().titleCase().s}</Link>
              ))}
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Contact</ListHeader>
              <Stack direction={'row'} spacing={2}>
                <Image cursor={'pointer'} onClick={onOpen} boxSize="35px" src="/wechat.svg"/>
                <Link href={'https://www.instagram.com/kissy_ruwen_by_amy_uk/'}>
                  <Image boxSize="35px" src="/instagram.svg"/>
                </Link>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
        <Center>
          <Stack align={'flex-start'}>
            <Wrap direction={'row'} spacing={2}>
              {["paypal", "applepay", "googlepay", "amex", "mastercard", "visa"].map(payment => (
                <WrapItem key={payment}><Image boxSize="50px" src={`/${payment}.svg`}/></WrapItem>
              ))}
            </Wrap>
          </Stack>
        </Center>
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

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan in Wechat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="/wechatqr.svg"/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
