import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '../App.css';
import { CellI } from '../model/Cell';
import { Cursor } from '../model/Cursor';
import { MiniGrid } from '../model/MiniGrid';
import { SubGrid } from './SubGrid';
import sudoku from '../model/sudoku';
import { StartWindow } from './StartWindow';
import { setValidators } from '../helpers/setValidators';
import { Confetti } from './Confetti';

export interface SudokuProps {}

export default function Sudoku(props: SudokuProps) {
  const cursor = new Cursor();
  const [level, setLevel] = useState<string>();
  const [finished, setFinished] = useState<boolean>(false);
  const [size] = useState(3);
  const [grids, setGrids] = useState(
    new Array(size).fill(0).map(() =>
      new Array(size).fill(0).map(() =>
        MiniGrid.create([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ])
      )
    )
  );

  function handleFocus(e: FocusEvent) {
    const target = e.target as HTMLInputElement;
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
    (
      document.querySelector(
        `input[data-row="${cursor.row}"][data-col="${cursor.col}"]`
      ) as HTMLInputElement
    )?.focus();
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
      grids.forEach((row, rIndex) => {
        row.forEach((grid, cIndex) => {
          grid.cells.forEach((cell) => {
            const boardColumn = cell.col + 3 * cIndex;
            const boardRow = cell.row + 3 * rIndex;
            const char = game[boardColumn + boardRow * 9] as string;
            cell.value = char === '.' ? 0 : parseInt(char);
            cell.disabled = !!cell.value;
            if (cell.disabled) {
              cursor.disabled({
                col: boardColumn,
                row: boardRow
              } as CellI);
            }
          });
        });
      });
      setGrids([...grids]);
      (
        document.querySelector('input[data-row][data-col]') as HTMLInputElement
      )?.focus();
    }
  }, [level]);

  function handleChange({
    grid,
    cell,
    value
  }: {
    grid: MiniGrid;
    cell: CellI;
    value: number;
  }) {
    grid.update(cell, value);
    checkGameFinished();
    setGrids([...grids]);
  }

  function checkGameFinished() {
    if (
      level &&
      grids
        .reduce((acc, row) => acc.concat(row), [])
        .every((grid) => grid.valid())
    ) {
      setFinished(true);
      setLevel('');
    }
  }

  function levelSelected(level: string) {
    setLevel(level);
    setFinished(false);
  }

  return (
    <div className="board">
      <StartWindow
        levels={['easy', 'medium', 'hard']}
        onSelect={levelSelected}
        show={!level || finished}
      >
        {finished ? <h3>Great job! You did it!</h3> : ''}
      </StartWindow>
      <Confetti show={finished} />
      {grids.map((row, rIndex) =>
        row.map((grid, cIndex) => (
          <SubGrid
            key={`${rIndex}_${cIndex}_grid`}
            row={rIndex + 1}
            col={cIndex + 1}
            cells={grid.toJSON().cells}
            onChange={(data) => handleChange({ grid, ...data })}
          />
        ))
      )}
    </div>
  );
}
