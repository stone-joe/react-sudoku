import React, { FormEvent } from 'react';
import { Cell } from '../model/Cell.js';

export interface ChangeDetail {
  cell: Cell;
  value: number;
}

export interface SubGridProps {
  cells: Cell[];
  onChange(detail: ChangeDetail): void;
  row?: number;
  col?: number;
}

export function SubGrid({ cells, onChange, row, col}: SubGridProps) {
  function handleKeyStroke(e: FormEvent<HTMLInputElement>, cell: Cell) {
    e.preventDefault();
    e.stopPropagation();
    const value = (e.target as HTMLInputElement).value;
    const num = parseInt(value[value.length - 1]);
    if (num) {
      onChange({
        cell,
        value: num 
      });
    }
  }
  return (
    <div className='sub-grid' style={{'--row': row, '--col': col} as any}>
      {cells.map((cell) => (
        <input
          key={`${cell.row}_${cell.col}`}
          type="text"
          onChange={() => {/* noop to make the compiler happy */ }}
          onInput={(e) => handleKeyStroke(e, cell)}
          value={cell.value || ''}
          maxLength={1}
          className={cell.valid ? '' : 'invalid'}
          style={{'--row': cell.row + 1, '--col': cell.col + 1} as any}
        />
      ))}
    </div>
  );
}