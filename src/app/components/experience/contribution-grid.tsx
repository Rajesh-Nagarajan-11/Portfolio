'use client';

import React, { useRef, useEffect } from 'react';

const LEVEL_COLORS = [
  'transparent',
  '#0E4429',
  '#006D32',
  '#26A641',
  '#39D353',
];

const ROWS = 45;
const COLS = 85;

interface Cell {
  level: number;
  glow: boolean;
}

function buildGrid(): Cell[][] {
  const grid: Cell[][] = [];

  for (let r = 0; r < ROWS; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < COLS; c++) {
      const colRatio = c / (COLS - 1);
      const isActive = Math.random() < colRatio ** 2.5;

      if (!isActive) {
        row.push({ level: 0, glow: false });
        continue;
      }

      const roll = Math.random();
      let level = 1;
      if (roll < colRatio * 0.4) level = 4;
      else if (roll < colRatio * 0.75) level = 3;
      else if (roll < colRatio * 0.95) level = 2;

      const glow = level === 4 && Math.random() < 0.25;

      row.push({ level, glow });
    }
    grid.push(row);
  }

  return grid;
}

const GRID = buildGrid();

export default function ContributionGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellWidth = 10;
    const gap = 3;
    const radius = 2;
    const step = cellWidth + gap;

    const width = COLS * step - gap;
    const height = ROWS * step - gap;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = GRID[r][c];
        if (cell.level === 0 || cell.glow) continue;

        const colRatio = c / (COLS - 1);
        ctx.fillStyle = LEVEL_COLORS[cell.level];
        ctx.globalAlpha = colRatio ** 1.2;

        const x = c * step;
        const y = r * step;
        ctx.beginPath();
        ctx.roundRect(x, y, cellWidth, cellWidth, radius);
        ctx.fill();
      }
    }

    ctx.shadowColor = LEVEL_COLORS[4];
    ctx.shadowBlur = 8;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = GRID[r][c];
        if (!cell.glow) continue;

        const colRatio = c / (COLS - 1);
        ctx.fillStyle = LEVEL_COLORS[4];
        ctx.globalAlpha = colRatio ** 1.2;

        const x = c * step;
        const y = r * step;
        ctx.beginPath();
        ctx.roundRect(x, y, cellWidth, cellWidth, radius);
        ctx.fill();
      }
    }

    ctx.shadowBlur = 0;
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-end overflow-visible">
      <canvas
        ref={canvasRef}
        className="block w-full h-auto object-cover"
      />
    </div>
  );
}