import React, { useRef, useEffect, useState } from 'react';


const Canvas = ({ socket}) => {
  const arr=["one", "two", "three"];
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [strokeColor, setStrokeColor] = useState('black'); // Default color
  const [strokeWidth, setStrokeWidth] = useState(2); // Default stroke width
const room="myRoom";
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, width, height);
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    // Receive drawing data from other users via socket
    socket.on('canvas-data', (drawingData) => {
      const { x, y, strokeColor, strokeWidth, isDrawing } = drawingData;
      if (!isDrawing || !context) return;

      context.lineTo(x, y);
      context.strokeStyle = strokeColor;
      context.lineWidth = strokeWidth;
      context.stroke();
    });

    return () => {
      socket.off('canvas-data');
    };
  }, [socket, context]);

  const startDrawing = (x, y) => {
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (x, y) => {
    if (!isDrawing) return;

    context.lineTo(x, y);
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    context.stroke();

    // Emit drawing data to the server
    socket.emit('canvas-data', {
      room, // Add room to data
      drawingData: {
        x,
        y,
        isDrawing,
        strokeColor,
        strokeWidth,
      },
    });
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    startDrawing(offsetX, offsetY);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    draw(offsetX, offsetY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startDrawing(x, y);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draw(x, y);
  };

  const handleTouchEnd = () => {
    stopDrawing();
  };

  const handleColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const handleStrokeWidthChange = (e) => {
    setStrokeWidth(e.target.value);
  };

  return (<>
<div className=' w-full text-center text-white'>
fgdgjldf
</div>
    <div className="flex flex-col items-center mt-4 ">
      {/* Canvas */}
      <div className="w-full h-full border-2 border-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Color Picker */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="text-lg">
          Select Color:
          <input
            type="color"
            value={strokeColor}
            onChange={handleColorChange}
            className="ml-2"
          />
        </label>

        {/* Stroke Width Slider */}
        <label className="text-lg">
          Stroke Width:
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={handleStrokeWidthChange}
            className="ml-2"
          />
          <span className="ml-2">{strokeWidth}px</span>
        </label>
      </div>
    </div>
    </>
  );
};

export default Canvas;
