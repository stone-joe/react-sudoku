import React, { Component, useEffect, useState } from 'react';
import '../App.css';
import { Cell } from '../model/Cell';
import { MiniGrid } from '../model/MiniGrid';
import { SubGrid } from './SubGrid';

export interface SudokuProps { }

export function setValidators(grids: MiniGrid[], miniGridSideLength: number) {
  grids.forEach((grid, gridIndex) => {
    // add each cell in the same row as a validator
    for (const otherGrid of grids.slice(Math.floor(gridIndex / miniGridSideLength), Math.floor(gridIndex / miniGridSideLength) + miniGridSideLength)) {
      if (otherGrid !== grid) {
        for (let i = 0; i < miniGridSideLength; i++) {
          grid.row(i).forEach(cell => {
            cell.setValidators(otherGrid.row(i));
          });
        }
      }
    }

    // add the columns as validators
    const columnGrids = [];
    // check ahead
    for (let i = gridIndex + miniGridSideLength, n = grids.length; i < n; i += miniGridSideLength) {
      columnGrids.push(grids[i]);
    }
    // check behind
    for (let i = gridIndex - miniGridSideLength; i > 0; i -= miniGridSideLength) {
      columnGrids.push(grids[i]);
    }

    for (const otherGrid of columnGrids) {
      if (otherGrid !== grid) {
        for (let i = 0; i < miniGridSideLength; i++) {
          grid.column(i).forEach(cell => {
            cell.setValidators(otherGrid.column(i));
          });
        }
      }
    }
  });
}

export default function Sudoku(props: SudokuProps) {
  const [size, setSize] = useState(3);
  const [grids, setGrids] = useState(
    new Array(size * size).fill(0).map(() => new MiniGrid([
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]))
  );

  useEffect(() => {
    setValidators(grids, size);
  }, []);

  function handleChange({ grid, cell, value }: { grid: MiniGrid; cell: Cell; value: number }) {
    grid.update(cell, value);
    setGrids([...grids]);
  }

  return (
    <div className='board'>
      {grids.map((grid, i) => (
        <SubGrid
          key={`${i}_grid`}
          row={Math.floor(i / size) + 1}
          col={(i - size * Math.floor(i / size)) + 1}
          cells={[...grid.cells]}
          onChange={(data) => handleChange({ grid, ...data })}
        />
      ))}
    </div>
  );
}
