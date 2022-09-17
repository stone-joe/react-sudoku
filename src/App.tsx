import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MiniGrid } from './MiniGrid.js';
import { ChangeDetails, SubGrid } from './SubGrid.js';

export interface SudokuProps {}
export interface SudokuState {}

export class Sudoku extends Component<SudokuProps, SudokuState> {
  #grids: MiniGrid[][] = new Array(3).fill(
    new Array(3).fill(
      new MiniGrid([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ])
    )
  );

  #handleChange({ grid, row, col, value }: ChangeDetails & { grid: MiniGrid }) {
    if (grid.add(row, col, value)) {
      // validate the row and column

    }
  }

  render() {
    return (
      <div className='board'>
        {grids.map(row => (
          grids.map(grid => (
            <SubGrid grid={grid} onChange={(data) => handleChange({ grid, ...data })} />
          ))
        ))}
      </div>
    );
  }
}

export default App;
