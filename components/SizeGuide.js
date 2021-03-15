import {
  useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Center, Flex, Stack, useColorModeValue, SimpleGrid, useBreakpointValue,
} from "@chakra-ui/react"
import S from "string"
import { FaRulerCombined } from "react-icons/fa";

export default function SizeGuide(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { product } = props
  const title = S(`kissy ${product && product.slug} size guide`).humanize().titleCase().s

  return (
    <>
      <Button leftIcon={<FaRulerCombined />} onClick={onOpen}>Size Guide</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Flex
                w="full"
                bg="white"
                p={{base:"20px", sm: "2px"}}
                alignItems="center"
                justifyContent="center"
              >
                <Stack
                  direction={{ base: "column" }}
                  w="full"
                  shadow={{base:"",sm:"lg"}}
                  spacing={{base:"20px", sm: "2px"}}
                >
                  {product.size_guide && product.size_guide.map((guide, pid) => {
                    return (
                      <Flex
                        direction={{ base: "row", sm: "column" }}
                        bg={useColorModeValue("white", "red.200")}
                      >
                        {useBreakpointValue({ base: true, sm: pid === 0 }) && (
                          <SimpleGrid
                            spacingY={3}
                            spacingX={1}
                            columns={{ base: 1, sm: Object.keys(guide).length }}
                            w={{ base: 100, sm: "full" }}
                            textTransform="uppercase"
                            bg={useColorModeValue("red.300", "red.400")}
                            color="white"
                            py={{ base: 1, sm: 1 }}
                            px={{ base: 2, sm: 4 }}
                            fontSize="sm"
                            fontWeight="bold"
                          >
                            {Object.keys(guide).map(attr => (<Center textAlign="center">{attr}</Center>))}
                          </SimpleGrid>
                        )}
                        <SimpleGrid
                          spacingY={3}
                          spacingX={1}
                          columns={{ base: 1, sm: Object.keys(guide).length }}
                          w="full"
                          py={{ base: 1, sm: 1 }}
                          px={{ base: 2, sm: 4 }}
                          shadow={{base:"lg",sm:""}}
                          bg={pid % 2 === 0 ? "red.50" : "white"}
                        >
                          {Object.keys(guide).map(attr => (<Center textAlign="center">{guide[attr]}</Center>))}
                        </SimpleGrid>
                      </Flex>
                    )
                  })}
                </Stack>
              </Flex>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>OK</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
