import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { FaHome, FaQuoteRight, FaPaintBrush } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={2} position="fixed" top="0" width="100%" zIndex="1000">
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold" color="white">
          MyWebsite
        </Text>
        <Spacer />
        <Flex>
          <Link as={RouterLink} to="/" display="flex" alignItems="center" color="white" mx={2}>
            <FaHome />
            <Text ml={1}>Home</Text>
          </Link>
          <Link as={RouterLink} to="/quotes" display="flex" alignItems="center" color="white" mx={2}>
            <FaQuoteRight />
            <Text ml={1}>Quotes</Text>
          </Link>
          <Link as={RouterLink} to="/canvas" display="flex" alignItems="center" color="white" mx={2}>
            <FaPaintBrush />
            <Text ml={1}>Canvas</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;