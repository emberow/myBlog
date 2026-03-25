import React, { useState, useCallback, useRef, useEffect } from 'react';

const cellSize = 12; // 格子大小固定，數量隨容器改變
const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 1], [-1, -1], [1, 0], [-1, 0]
];

const GameOfLife = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // 狀態：網格資料與網格維度
  const [grid, setGrid] = useState([]);
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });

  // 初始化或視窗縮放時，重新計算網格大小
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      
      setDimensions({ rows, cols });
      setGrid(Array.from({ length: rows }, () => Array(cols).fill(0)));
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const runSimulation = useCallback(() => {
    setGrid((currentGrid) => {
      if (currentGrid.length === 0) return currentGrid;
      const isGridEmpty = currentGrid.every(row => row.every(cell => cell === 0));
      if (isGridEmpty) return currentGrid;

      return currentGrid.map((row, i) =>
        row.map((cell, k) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (newI >= 0 && newI < dimensions.rows && newK >= 0 && newK < dimensions.cols) {
              neighbors += currentGrid[newI][newK];
            }
          });
          if (neighbors < 2 || neighbors > 3) return 0;
          if (cell === 0 && neighbors === 3) return 1;
          return cell;
        })
      );
    });
  }, [dimensions]);

  useEffect(() => {
    const interval = setInterval(runSimulation, 100);
    return () => clearInterval(interval);
  }, [runSimulation]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const i = Math.floor(y / cellSize);
    const k = Math.floor(x / cellSize);

    if (i >= 0 && i < dimensions.rows && k >= 0 && k < dimensions.cols) {
      setGrid((currentGrid) => {
        if (currentGrid[i][k] === 1) return currentGrid;
        const newGrid = [...currentGrid];
        newGrid[i] = [...newGrid[i]];
        newGrid[i][k] = 1;
        return newGrid;
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    grid.forEach((row, i) => {
      row.forEach((col, k) => {
        if (col) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(k * cellSize, i * cellSize, cellSize, cellSize);
        }
      });
    });
  }, [grid]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        width={dimensions.cols * cellSize}
        height={dimensions.rows * cellSize}
        onMouseMove={handleMouseMove}
        style={{ display: 'block' }} // 防止 inline 元素下方的微小間隙
      />
    </div>
  );
};

export default GameOfLife;