import {
  Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Link, Popover,
  PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue,
  useDisclosure, Badge, HStack, Center
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import {
  HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon,
} from '@chakra-ui/icons';
import Logo from "@components/Logo"
import Checkout from "@components/Checkout"
import S from "string"

export default function WithSubnavigation(props) {
  const { isOpen, onToggle } = useDisclosure();
  const navItems = props.categories.map(cat => (
    {
      slug: cat.slug,
      label: S(cat.slug).humanize().titleCase().s,
      href: `/shop/${cat.slug}`,
      children: cat.products.map(pro => (
        {
          slug: pro.slug,
          label: S(pro.slug).humanize().titleCase().s,
          subLabel: pro.name_cn,
          href: `/shop/${cat.slug}/${pro.slug}`,
          highlight: pro.limited_edition
        }
      ))
    }
  ))

  return (
    <Box zIndex={999} pos="fixed" top={0} w="full" opacity="98%">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Logo/>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={navItems}/>
          </Flex>
        </Flex>

        <Checkout />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems}/>
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  const router = useRouter()
  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.slug}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link p={2} href={navItem.href ?? '#'} fontSize={'sm'}
                fontWeight={500}
                color={router.asPath.match(`/shop/${navItem.slug}/*`) ? 'pink.400' : useColorModeValue('gray.600', 'gray.200')}
                fontWeight={router.asPath.match(`/shop/${navItem.slug}/*`) && 'bold'}
                _hover={{
                  textDecoration: 'none',
                  color: useColorModeValue('gray.800', 'white'),
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                {navItem.children.length ? <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.slug} {...child} />
                  ))}
                </Stack> : "Coming Soon"}
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ slug, label, href, subLabel, highlight }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <HStack>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Center>
            <Badge m={2} fontSize="6pt" variant="solid" colorScheme="pink">{ highlight && "Limited Edition" }</Badge>
          </Center>
        </HStack>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ navItems }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.slug} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ slug, label, children, href, highlight }) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter()

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
          <Link href={href ?? '#'} _hover={{textDecoration: 'none'}}>
            <Text
              fontWeight={600}
              color={router.asPath.match(`/shop/${slug}/*`) ? 'pink.400' : useColorModeValue('gray.600', 'gray.200')}
              fontWeight={router.asPath.match(`/shop/${slug}/*`) && 'bold'}>
              {label}
            </Text>
          </Link>
        {children && (
          <Icon onClick={children && onToggle}
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        {children && children.length ? <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          { children.map((child) => (
            <Link key={child.slug} py={2} href={child.href}>
              <HStack>
                <Text>{child.label}</Text>
                <Center>
                  <Badge m={2} fontSize="6pt" variant="solid" colorScheme="pink">{ child.highlight && "Limited Edition" }</Badge>
                </Center>
              </HStack>
            </Link>
          ))}
        </Stack> : "Coming Soon"}
      </Collapse>
    </Stack>
  );
};
