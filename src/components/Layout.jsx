import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from '@chakra-ui/react';
import { X, Menu } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const Links = [
  { name: 'Sobre', to: '/' },
  { name: 'Ler QR Code', to: '/qr-code-reader' },
  { name: 'Exemplos de QR Code', to: '/qr-code-exemples' },
  { name: 'Lista de presença', to: '/lista-alunos' }
];

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="gray.100" px={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <X /> : <Menu />}
            aria-label="Abrir menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box fontWeight="bold">Meu App</Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(link => (
                <Link key={link.to} to={link.to}>
                  <Button variant="ghost">{link.name}</Button>
                </Link>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links.map(link => (
                <Link key={link.to} to={link.to}>
                  <Button w="full" variant="ghost">{link.name}</Button>
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
