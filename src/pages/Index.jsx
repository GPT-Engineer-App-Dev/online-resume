import { Container, Text, VStack, Box, Heading, Button, Image, Flex, HStack, Link } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink

const Index = () => {
  return (
    <Container centerContent maxW="container.md" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Welcome to My Personal Website</Heading>
          <Text fontSize="lg">I'm a Full Stack Developer specializing in modern web technologies.</Text>
        </Box>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          mb={4}
        />
        <Flex justify="center" gap={4}>
          <Button as="a" href="https://github.com" target="_blank" leftIcon={<FaGithub />} colorScheme="teal" variant="outline">
            GitHub
          </Button>
          <Button as="a" href="https://linkedin.com" target="_blank" leftIcon={<FaLinkedin />} colorScheme="teal" variant="outline">
            LinkedIn
          </Button>
          <Button as="a" href="mailto:example@example.com" leftIcon={<FaEnvelope />} colorScheme="teal" variant="outline">
            Email
          </Button>
        </Flex>
        <Button as={RouterLink} to="/quotes" colorScheme="teal" variant="solid">
          View Quotes
        </Button>
      </VStack>
      <Footer />
    </Container>
  );
};

const Footer = () => {
  return (
    <Box as="footer" width="100%" py={4} bg="gray.800" color="white" mt={8}>
      <Container maxW="container.md">
        <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} textAlign={{ base: "center", md: "left" }}>
          <Text mb={{ base: 2, md: 0 }}>© {new Date().getFullYear()} My Personal Website. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="https://github.com" isExternal>
              <FaGithub size="24px" />
            </Link>
            <Link href="https://linkedin.com" isExternal>
              <FaLinkedin size="24px" />
            </Link>
            <Link href="mailto:example@example.com">
              <FaEnvelope size="24px" />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Index;