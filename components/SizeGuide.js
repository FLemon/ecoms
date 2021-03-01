import {
  useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Center
} from "@chakra-ui/react"
import S from "string"
import { FaRulerCombined } from "react-icons/fa";

export default function SizeGuide(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { product } = props
  const title = S(`kissy ${product.slug} size guide`).humanize().titleCase().s

  const GuideHeaders = ({ sizeGuide }) => {
    if (sizeGuide.length === 0) {
      return <></>
    }

    return (
      <Thead>
        <Tr>{Object.keys(sizeGuide[0]).map(h => <Th key={h}>{h}</Th>)}</Tr>
      </Thead>
    )
  }

  const GuideBody = ({ sizeGuide }) => {
    if (sizeGuide.length === 0) {
      return <></>
    }

    return (
      <Tbody>
        {sizeGuide.map((sg, index) => (
          <Tr key={index}>{Object.values(sg).map(v => <Td key={v}>{v}</Td>)}</Tr>
        ))}
      </Tbody>
    )
  }

  return (
    <>
      <Button leftIcon={<FaRulerCombined />} onClick={onOpen}>Size Guide</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Table variant="striped" colorScheme="red" size="sm">
                <TableCaption>{title}</TableCaption>
                <GuideHeaders sizeGuide={product.size_guide}/>
                <GuideBody sizeGuide={product.size_guide}/>
              </Table>
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
