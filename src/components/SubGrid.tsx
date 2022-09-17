import React from 'react';
import { KeyboardEvent } from 'react';
import { Cell } from '../model/Cell.js';
import { Point } from '../model/Point';

export interface ChangeDetail {
  cell: Cell;
  value: number;
}

export interface SubGridProps {
  cells: Cell[];
  onChange(detail: ChangeDetail): void;
}

export function SubGrid({ cells, onChange }: SubGridProps) {
  function handleKeyStroke(e: KeyboardEvent<HTMLInputElement>, cell: Cell) {
    e.preventDefault();
    e.stopPropagation();
    const number = parseInt((e.target as HTMLInputElement).value);
    (e.target as HTMLInputElement).value = number.toString();
    onChange({
      cell,
      value: number
    });
  }
  return (
    <div className='sub-grid'>
      {cells.map((cell) => (
        <input
          key={`${cell.row}_${cell.col}`}
          type="number"
          onChange={() => {/* noop to make the compiler happy */ }}
          onKeyUp={(e) => handleKeyStroke(e, cell)}
          value={cell.value}
          min={0}
          maxLength={1}
          className={cell.valid ? '' : 'invalid'}
        />
      ))}
    </div>
  );
}