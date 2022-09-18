import React, { KeyboardEvent } from 'react';
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
  function handleKeyStroke(e: KeyboardEvent<HTMLInputElement>, cell: Cell) {
    e.preventDefault();
    const value = parseInt(e.key);
    if (value) {
      onChange({
        cell,
        value 
      });
    }
  }
  return (
    <div className='sub-grid' style={{'--row': row, '--col': col} as any}>
      {cells.map((cell) => (
        <input
          key={`${cell.row}_${cell.col}`}
          data-row={(cell.row + 3 * ((row as number) - 1))?.toString()}
          data-col={(cell.col + 3 * ((col as number) - 1))?.toString()}
          type="text"
          onChange={() => { /* noop to make the compiler happy */ }}
          onKeyUp={(e) => {
            // for some reason, onInput isn't firing after the first "input" event.
            // to get around this, "keyup" is being used
            handleKeyStroke(e, cell);
          }}
          value={cell.value || ''}
          maxLength={1}
          size={3}
          className={cell.valid ? '' : 'invalid'}
          style={{'--row': cell.row + 1, '--col': cell.col + 1} as any}
        />
      ))}
    </div>
  );
}