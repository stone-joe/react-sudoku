import React from 'react';
import { KeyboardEvent } from 'react';
import { Point } from '../model/Point';

export interface SubGridProps {
  points: Point[][];
  onChange: (detail: Point) => void;
}

export function SubGrid({ points, onChange }: SubGridProps) {
  function handleKeyStroke(e: KeyboardEvent<HTMLInputElement>, row: number, column: number) {
    e.preventDefault();
    e.stopPropagation();
    const number = parseInt((e.target as HTMLInputElement).value);
    if (number > -1 && number < 10) {
      (e.target as HTMLInputElement).value = number.toString();
      onChange({
        row,
        col: column,
        value: number,
        valid: true
      });
    }
  }
  return (
    <div className='sub-grid'>
      {points.map((row, rIndex) => (
        row.map((point, cIndex) => (
          <input
            key={`${rIndex}_${cIndex}`}
            type="number"
            onChange={() => {/* noop to make the compiler happy */}}
            onKeyUp={(e) => handleKeyStroke(e, rIndex, cIndex)}
            value={point.value}
            min={0}
            maxLength={1}
            className={point.valid ? '' : 'invalid'}
          />
        ))
      ))}
    </div>
  );
}