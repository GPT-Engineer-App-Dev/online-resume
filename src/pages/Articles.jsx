import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input, Select, Box, VStack, Spinner, Container, Heading, Link } from '@chakra-ui/react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByAuthor, setFilterByAuthor] = useState('');
  const [filterByScore, setFilterByScore] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

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

  const filteredArticles = articles.filter(article => {
    return (
      (filterByAuthor === '' || article.by.toLowerCase().includes(filterByAuthor.toLowerCase())) &&
      (filterByScore === '' || article.score >= parseInt(filterByScore))
    );
  });

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
      <Box mb={4}>
        <Input
          placeholder="Filter by author"
          value={filterByAuthor}
          onChange={(e) => setFilterByAuthor(e.target.value)}
          mb={2}
        />
        <Select
          placeholder="Filter by score"
          value={filterByScore}
          onChange={(e) => setFilterByScore(e.target.value)}
        >
          <option value="10">10+</option>
          <option value="50">50+</option>
          <option value="100">100+</option>
        </Select>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Score</Th>
            <Th>Link</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredArticles.map((article) => (
            <Tr key={article.id} onClick={() => setSelectedArticle(article)}>
              <Td>{article.title}</Td>
              <Td>{article.by}</Td>
              <Td>{article.score}</Td>
              <Td>
                <Link href="#" onClick={(e) => { e.preventDefault(); setSelectedArticle(article); }}>
                  View
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedArticle && (
        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4}>Article Preview</Heading>
          <iframe src={selectedArticle.url} width="100%" height="600px" title="Article Preview" />
        </Box>
      )}
    </Container>
  );
};

export default Articles;