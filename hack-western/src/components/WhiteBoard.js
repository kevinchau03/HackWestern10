import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const WhiteBoard = () => {
  const canvasRef = useRef(null);
  const drawButtonRef = useRef(null);
  const eraseButtonRef = useRef(null);

  let socket;
  let context;
  let paths = {};
  let drawing = false;
  let erasing = false;

  useEffect(() => {
    // Initialize socket connection
    socket = io('http://localhost:8080'); // Replace with your server URL

    // Get canvas and context references
    const canvas = canvasRef.current;
    context = canvas.getContext('2d');

    // Set up event listeners
    drawButtonRef.current.addEventListener('click', toggleDrawing);
    eraseButtonRef.current.addEventListener('click', toggleErasing);

    canvas.addEventListener('mousedown', (e) => {
      if ((drawing || erasing) && e.button === 0) {
        drawStart(e);
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if ((drawing || erasing) && e.buttons === 1) {
        draw(e);
      }
    });

    canvas.addEventListener('mouseup', () => {
      if (drawing || erasing) {
        drawEnd();
      }
    });

    // Socket events
    socket.on('draw', (data) => handleDrawEvent(data));
    socket.on('clear', () => context.clearRect(0, 0, canvas.width, canvas.height));

    // Clean-up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const toggleDrawing = () => {
    drawing = !drawing;
    erasing = false;
    eraseButtonRef.current.classList.remove('active');
    drawButtonRef.current.textContent = drawing ? 'Pen' : 'Draw';
  };

  const toggleErasing = () => {
    erasing = !erasing;
    drawing = false;
    eraseButtonRef.current.classList.toggle('active');
    drawButtonRef.current.textContent = erasing ? 'Draw' : 'Pen';
  };

  const drawStart = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    paths[socket.id] = { x, y };

    context.beginPath();
    context.moveTo(x, y);

    socket.emit('draw', { x, y, start: true, mode: erasing ? 'erase' : 'draw' });
  };

  const draw = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineWidth = erasing ? 10 : 5;
    context.lineCap = 'round';
    context.globalCompositeOperation = erasing ? 'destination-out' : 'source-over';
    context.strokeStyle = erasing ? '#fff' : '#000';
    context.lineTo(x, y);
    context.stroke();

    paths[socket.id] = { x, y };

    socket.emit('draw', { x, y, mode: erasing ? 'erase' : 'draw' });
  };

  const drawEnd = () => {
    context.beginPath();
    socket.emit('draw', { end: true });
  };

  const handleDrawEvent = (data) => {
    if (data.start) {
      paths[data.id] = { x: data.x, y: data.y };
      context.beginPath();
      context.moveTo(data.x, data.y);
    } else if (data.end) {
      context.beginPath();
    } else {
      context.lineWidth = data.mode === 'erase' ? 10 : 5;
      context.lineCap = 'round';
      context.globalCompositeOperation = data.mode === 'erase' ? 'destination-out' : 'source-over';
      context.strokeStyle = data.mode === 'erase' ? '#fff' : '#000';
      context.lineTo(data.x, data.y);
      context.stroke();
      paths[data.id] = { x: data.x, y: data.y };
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} id="whiteboard" width="250" height="250"></canvas>
      <button ref={drawButtonRef}>Draw/Pen</button>
      <button ref={eraseButtonRef}>Erase</button>
    </div>
  );
};

export default WhiteBoard;