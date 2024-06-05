import { Box, Flex, HStack, Link, IconButton, useDisclosure, Stack } from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>Logo</Box>
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <Link as={RouterLink} to="/">Home</Link>
            <Link as={RouterLink} to="/about">About</Link>
            <Link as={RouterLink} to="/projects">Projects</Link>
            <Link as={RouterLink} to="/contact">Contact</Link>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link as={RouterLink} to="/" onClick={onClose}>Home</Link>
            <Link as={RouterLink} to="/about" onClick={onClose}>About</Link>
            <Link as={RouterLink} to="/projects" onClick={onClose}>Projects</Link>
            <Link as={RouterLink} to="/contact" onClick={onClose}>Contact</Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;