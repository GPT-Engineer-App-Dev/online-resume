import { Container, Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
];

const Quotes = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Quotes
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {quotes.map((quote, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <VStack spacing={4}>
              <Text fontSize="lg" fontStyle="italic">"{quote.text}"</Text>
              <Text fontWeight="bold">- {quote.author}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Quotes;