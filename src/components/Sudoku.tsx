import React, { useEffect, useState } from 'react';
import '../App.css';
import { Cell, CellI } from '../model/Cell';
import { Cursor } from '../model/Cursor';
import { MiniGrid } from '../model/MiniGrid';
import { SubGrid } from './SubGrid';
import sudoku from '../model/sudoku';
import { StartWindow } from './StartWindow';
import { setValidators } from '../helpers/setValidators';

export interface SudokuProps { }

export default function Sudoku(props: SudokuProps) {
  const cursor = new Cursor();
  const [level, setLevel] = useState<string>();
  const [size, setSize] = useState(3);
  const [grids, setGrids] = useState(
    new Array(size * size).fill(0).map(() => new MiniGrid([
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]))
  );

  function handleFocus(e: FocusEvent) {
    const target = (e.target) as HTMLInputElement;
    cursor.col = parseInt(target.dataset.col as string);
    cursor.row = parseInt(target.dataset.row as string);
  }

  async function handleKeyUp(e: KeyboardEvent) {
    try {
      // keyup is firing more than once ... using a debounce
      // to avoid double updates
      await cursor.debounce();
    } catch (e) {
      // ignore - a rejected promise means that a timer is already in progress
      return;
    }
    cursor.process(e.key);
    (document.querySelector(`input[data-row="${cursor.row}"][data-col="${cursor.col}"]`) as HTMLInputElement)?.focus();
  }

  useEffect(() => {
    setValidators(grids, size);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (level) {
      const game = sudoku.generate(level).split('');
      grids.forEach((grid, i) => {
        const row = Math.floor(i / size);
        const col = i - size * Math.floor(i / size);
        grid.cells.forEach(cell => {
          const char = game[(cell.col + 3 * col) + ((cell.row + 3 * row) * 9)] as string;
          cell.value = char === '.' ? 0 : parseInt(char);
        });
      });
      setGrids([...grids]);
      console.log(grids);
    }
  }, [level]);

  function handleChange({ grid, cell, value }: { grid: MiniGrid; cell: CellI; value: number }) {
    grid.update(cell, value);
    setGrids([...grids]);
  }

  return (
    <div className='board'>
      <StartWindow levels={["easy", 'medium', 'hard']} onSelect={setLevel} show={!level} />
      {grids.map((grid, i) => (
        <SubGrid
          key={`${i}_grid`}
          row={Math.floor(i / size) + 1}
          col={(i - size * Math.floor(i / size)) + 1}
          cells={grid.toJSON().cells}
          onChange={(data) => handleChange({ grid, ...data })}
        />
      ))}
    </div>
  );
}
