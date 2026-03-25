import React, { useState, useCallback, useRef, useEffect } from 'react';

const cellSize = 12;
const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 1], [-1, -1], [1, 0], [-1, 0]
];

const GALAXY = [
  [0,0], [0,1], [0,2], [0,3], [0,4], [0,5],
  [1,0], [1,1], [1,2], [1,3], [1,4], [1,5],
  [3,0], [4,0], [5,0], [6,0], [7,0], [8,0],
  [3,1], [4,1], [5,1], [6,1], [7,1], [8,1],
  [7,3], [7,4], [7,5], [7,6], [7,7], [7,8],
  [8,3], [8,4], [8,5], [8,6], [8,7], [8,8],
  [0,7], [1,7], [2,7], [3,7], [4,7], [5,7],
  [0,8], [1,8], [2,8], [3,8], [4,8], [5,8]
];

const GameOfLife = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      
      let newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));

      // 計算中心點 (脈衝星大約佔 15-17 格，所以向上向左偏移 8 格來置中)
      const midR = Math.floor(rows / 2) - 8;
      const midC = Math.floor(cols / 2) - 8;

      GALAXY.forEach(([dr, dc]) => {
        const r = midR + dr;
        const c = midC + dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          newGrid[r][c] = 1;
        }
      });

      setDimensions({ rows, cols });
      setGrid(newGrid);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const runSimulation = useCallback(() => {
    setGrid((currentGrid) => {
      if (currentGrid.length === 0) return currentGrid;
      // 檢查是否全空，全空就不用算了
      if (currentGrid.every(row => row.every(cell => cell === 0))) return currentGrid;

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
    
    // 背景：純白
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 繪製細胞：灰色
    ctx.fillStyle = '#F3F3F3';
    grid.forEach((row, i) => {
      row.forEach((col, k) => {
        if (col) {
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
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default GameOfLife;