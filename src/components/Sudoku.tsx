import React, { useEffect, useState } from 'react';
import '../App.css';
import { Cell } from '../model/Cell';
import { Cursor } from '../model/Cursor';
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
  const cursor = new Cursor();
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
    document.addEventListener('focusin', (e) => {
      const target = (e.target) as HTMLInputElement;
      cursor.col = parseInt(target.dataset.col as string);
      cursor.row = parseInt(target.dataset.row as string);
    });
    document.addEventListener('keyup', async (e) => {
      try {
        // keyup is firing more than once ... using a debounce
        // to avoid double updates
        await cursor.debounce();
        cursor.process(e.key);
        (document.querySelector(`input[data-row="${cursor.row}"][data-col="${cursor.col}"]`) as HTMLInputElement)?.focus();
      } catch (e) {
        // ignore
      }
    });
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
