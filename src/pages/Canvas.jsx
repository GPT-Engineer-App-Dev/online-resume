import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Flex, IconButton, Select, useToast } from '@chakra-ui/react';
import { FaEraser, FaSave } from 'react-icons/fa';

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const toast = useToast();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    canvas.style.width = `${window.innerWidth * 0.8}px`;
    canvas.style.height = `${window.innerHeight * 0.6}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    contextRef.current = context;

    const savedDrawing = localStorage.getItem('canvasDrawing');
    if (savedDrawing) {
      const img = new Image();
      img.src = savedDrawing;
      img.onload = () => context.drawImage(img, 0, 0);
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    saveDrawing();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    localStorage.setItem('canvasDrawing', dataURL);
    toast({
      title: 'Drawing saved!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('canvasDrawing');
  };

  return (
    <Box p={4}>
      <Flex justify="center" mb={4}>
        <Select value={brushColor} onChange={(e) => setBrushColor(e.target.value)} width="150px" mr={2}>
          <option value="#000000">Black</option>
          <option value="#FF0000">Red</option>
          <option value="#00FF00">Green</option>
          <option value="#0000FF">Blue</option>
        </Select>
        <Select value={brushSize} onChange={(e) => setBrushSize(e.target.value)} width="100px" mr={2}>
          <option value={5}>Small</option>
          <option value={10}>Medium</option>
          <option value={15}>Large</option>
        </Select>
        <IconButton icon={<FaEraser />} onClick={clearCanvas} aria-label="Clear Canvas" mr={2} />
        <IconButton icon={<FaSave />} onClick={saveDrawing} aria-label="Save Drawing" />
      </Flex>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ border: '1px solid #000', backgroundColor: '#fff' }}
      />
    </Box>
  );
};

export default Canvas;