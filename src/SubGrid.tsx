import { KeyboardEvent } from 'react';
import { MiniGrid } from './MiniGrid'
import { Point } from './Point';

export interface ChangeDetails extends Point {
  value: number;
}

export interface SubGridProps {
  grid: MiniGrid;
  invalid: Point[],
  onChange: (detail: ChangeDetails) => void;
}

export function SubGrid({ grid, invalid, onChange }: SubGridProps) {
  function handleKeyStroke(e: KeyboardEvent<HTMLInputElement>, row: number, column: number) {
    e.preventDefault();
    e.stopPropagation();
    const number = parseInt((e.target as HTMLInputElement).value);
    if (number > -1 && number < 10) {
      (e.target as HTMLInputElement).value = number.toString();
      onChange({
        row,
        col: column,
        value: number
      });
    }
  }
  return (
    <div className='sub-grid'>
      {grid.grid.map((row, rIndex) => (
        row.map((col, cIndex) => (
          <input
            key={`${rIndex}_${cIndex}`}
            type="number"
            onChange={() => {/* noop to make the compiler happy */}}
            onKeyUp={(e) => handleKeyStroke(e, rIndex, cIndex)}
            value={col}
            min={0}
            maxLength={1}
            className={invalid.some(p => p.row === rIndex && p.col === cIndex) ? 'invalid' : ''}
          />
        ))
      ))}
    </div>
  );
}