import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialColumns = {
  'todo': {
    name: 'To-do',
    items: []
  },
  'in-progress': {
    name: 'In Progress',
    items: []
  },
  'done': {
    name: 'Done',
    items: []
  }
};

const Board = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newCardText, setNewCardText] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const addCard = (columnId) => {
    if (newCardText.trim() === '') return;
    const newCard = { id: `${new Date().getTime()}`, content: newCardText };
    const column = columns[columnId];
    const updatedItems = [...column.items, newCard];
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems
      }
    });
    setNewCardText('');
  };

  const deleteCard = (columnId, cardId) => {
    const column = columns[columnId];
    const updatedItems = column.items.filter(item => item.id !== cardId);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems
      }
    });
  };

  const editCard = (columnId, cardId, newContent) => {
    const column = columns[columnId];
    const updatedItems = column.items.map(item => item.id === cardId ? { ...item, content: newContent } : item);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems
      }
    });
    setEditingCard(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex justify="space-around" p={4}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                p={4}
                bg={snapshot.isDraggingOver ? 'gray.200' : 'gray.100'}
                borderRadius="md"
                w="30%"
                minH="400px"
              >
                <Heading size="md" mb={4}>{column.name}</Heading>
                <VStack spacing={4}>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          p={4}
                          bg="white"
                          borderRadius="md"
                          boxShadow="md"
                          mb={4}
                        >
                          {editingCard === item.id ? (
                            <Input
                              value={item.content}
                              onChange={(e) => editCard(columnId, item.id, e.target.value)}
                              onBlur={() => setEditingCard(null)}
                            />
                          ) : (
                            <Text onDoubleClick={() => setEditingCard(item.id)}>{item.content}</Text>
                          )}
                          <Button size="sm" colorScheme="red" onClick={() => deleteCard(columnId, item.id)}>Delete</Button>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
                <Input
                  placeholder="Add new card"
                  value={newCardText}
                  onChange={(e) => setNewCardText(e.target.value)}
                  mb={2}
                />
                <Button onClick={() => addCard(columnId)}>Add Card</Button>
              </Box>
            )}
          </Droppable>
        ))}
      </Flex>
    </DragDropContext>
  );
};

export default Board;