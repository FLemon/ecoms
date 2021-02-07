import { useRouter } from 'next/router'
import {
  Heading,
  Button, Text, Center, LinkBox, LinkOverlay, Box, Spacer, SimpleGrid, Image, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react"

import Layout from '@components/Layout'
import DataClient from '@components/DataClient'

const Product = ({ product }) => {
  const fallbackImage = "/product-fallback.jpeg"
  const imageSrc = product.images[0] ? product.images[0].url : fallbackImage

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <LinkBox onClick={onOpen} boxShadow="2xl" p="6" rounded="md" bg="white">
        <Image src={imageSrc} fallbackSrc={fallbackImage}/>
        <LinkOverlay href="#">
          <Text fontSize="3xl" color="black">{product.name_cn}</Text>
          <Text fontSize="1xl">{product.slug}</Text>
        </LinkOverlay>
      </LinkBox>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={imageSrc} fallbackSrc={fallbackImage}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function Shop(props) {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout {...props}>
      <SimpleGrid
        bg="gray.50"
        columns={{sm: 2, md: 4}}
        spacing="8"
        p="10"
        textAlign="center"
        rounded="lg"
        color="gray.400"
      >
        {props.products.map(product => (
          <Product key={product.slug} product={product}></Product>
        ))}
      </SimpleGrid>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const category = params.slug[0]
  return {
    props: {
      categories: await DataClient.getCategories(),
      products: await DataClient.getCategoryProducts(category)
    }
  }
}

export async function getStaticPaths() {
  const categories = await DataClient.getCategories()
  const paths = categories.map(cat => (
    { params: { slug: [cat.slug] } }
  ))
  return {
    paths,
    fallback: false
  };
}
