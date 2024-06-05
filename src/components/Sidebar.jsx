import { Box, Flex, IconButton, Link, VStack } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left={isOpen ? "0" : "-100%"}
      width="250px"
      height="100%"
      bg="gray.800"
      color="white"
      transition="left 0.3s ease"
      zIndex="999"
    >
      <Flex justify="flex-end" p={4}>
        <IconButton
          icon={<FaTimes />}
          onClick={onClose}
          variant="outline"
          aria-label="Close Sidebar"
        />
      </Flex>
      <VStack spacing={4} align="start" p={4}>
        <Link as={RouterLink} to="/" onClick={onClose}>
          Home
        </Link>
        <Link as={RouterLink} to="/quotes" onClick={onClose}>
          Quotes
        </Link>
        <Link as={RouterLink} to="/canvas" onClick={onClose}>
          Canvas
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;