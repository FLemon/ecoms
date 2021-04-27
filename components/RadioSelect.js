import {
  Box, FormControl, FormLabel, Select, useRadioGroup, useRadio, Center,
  Stack, HStack, Input, useColorModeValue, Heading, Text, RadioGroup
} from "@chakra-ui/react"
import S from "string"

const RadioCard = (props) => {
  const { boxType, obj } = props
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  const ColorBox = (props) => {
    const { boxValue, checkbox } = props
    return (
      <Box
        {...checkbox}
        cursor="pointer" borderWidth="1px" borderRadius="md" boxShadow="md"
        _checked={{ borderColor: boxValue, borderWidth:"2px" }} bgColor={boxValue}
        _focus={{ boxShadow: "outline" }} boxSize="40px"/>
    )
  }

  const SizeBox = (props) => {
    const { boxValue, checkbox } = props
    return (
      <Center
        {...checkbox}
        cursor="pointer" borderWidth="1px" borderRadius="md" boxShadow="md"
        _checked={{ bg: "teal.600", color: "white", borderColor: "teal.600" }}
        _focus={{ boxShadow: "outline" }} boxSize="40px"
      >
        {boxValue}
      </Center>
    )
  }

  return (
    <Box as="label">
      <input {...input} />
      {boxType === "color" ? <ColorBox boxValue={obj.slug} checkbox={checkbox} /> : <SizeBox boxValue={obj} checkbox={checkbox} />}
    </Box>
  )
}

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
        _checked={{ borderColor: color.slug, borderWidth:"2px" }} bgColor={color.slug}
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
        _focus={{ boxShadow: "outline" }} boxSize="40px"
      >
        {size.slug}
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
      <Text fontWeight="bold">{S(currentValue).humanize().titleCase().s}</Text>
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
