import React, { useEffect, useState } from 'react';
import { Container, Heading, SimpleGrid, Box, Text, Link, Spinner } from '@chakra-ui/react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const stories = await Promise.all(
          storyIds.slice(0, 10).map(async (id) => {
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyResponse.json();
          })
        );
        setArticles(stories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8} mt="60px">
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Hacker News Articles
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {articles.map((article) => (
          <Box key={article.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <VStack spacing={4}>
              <Link href={article.url} isExternal fontSize="lg" fontWeight="bold">
                {article.title}
              </Link>
              <Text>By: {article.by}</Text>
              <Text>Score: {article.score}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Articles;