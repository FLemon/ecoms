import {
  Box, FormControl, FormLabel, Select, useRadioGroup, useRadio, Center,
  Stack, HStack, Input, useColorModeValue, Heading, Text, RadioGroup,
} from "@chakra-ui/react"
import S from "string"

const ColorRadio = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  const color = props.children

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer" borderWidth="1px" borderRadius="md" boxShadow="md"
        _checked={{ borderColor: color.hex, borderWidth:"2px" }} bgColor={color.hex}
        _focus={{ boxShadow: "outline" }} boxSize="40px"/>
    </Box>
  )
}

const SizeRadio = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  const size = props.children

  return (
    <Box as="label">
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer" borderWidth="1px" borderRadius="md" boxShadow="md"
        _checked={{ bg: "teal.600", color: "white", borderColor: "teal.600" }}
        _focus={{ boxShadow: "outline" }} p={2} minW="40px"
      >
        {S(size.slug).humanize().s.toUpperCase()}
      </Center>
    </Box>
  )
}

export default function RadioSelect({ type, options, currentValue, onChange }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: type,
    defaultValue: currentValue,
    onChange,
  })

  const group = getRootProps()

  return (
    <>
    <HStack>
      <Text>{S(type).humanize().titleCase().s}:</Text>
      <Text fontWeight="bold">{S(currentValue).humanize().s.toUpperCase()}</Text>
    </HStack>
    <HStack p={1} {...group}>
      {options.map(option => {
        const value = option.slug
        const radio = getRadioProps({ value })

        if (type==="color") {
          return (<ColorRadio key={value} {...radio}>{option}</ColorRadio>)
        } else {
          return (<SizeRadio key={value} {...radio}>{option}</SizeRadio>)
        }
      })}
    </HStack>
    </>
  )
}
