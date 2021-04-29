import {
  Button, VisuallyHidden, useColorModeValue, chakra,
} from '@chakra-ui/react';

export default function SocialButton({ children, label, href, onClick }) {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      onClick={onClick}
      _hover={{ bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200') }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
    )
}
