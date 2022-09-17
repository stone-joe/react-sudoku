import React, { Component } from 'react';
import './App.css';
import { MiniGrid } from '../model/MiniGrid';
import { Point } from '../model/Point';
import { SubGrid } from './SubGrid';

export interface SudokuProps {}
export interface SudokuState {
  grids: MiniGrid[][]
}

export default class Sudoku extends Component<SudokuProps, SudokuState> {
  state = {
    grids: new Array(3).fill(
      new Array(3).fill(
        new MiniGrid([
          0, 0, 0,
          0, 0, 0,
          0, 0, 0
        ])
      )
    )
  } as SudokuState;

  #handleChange({ grid, row, col, value }: Point & { grid: MiniGrid }) {
    if (grid.add(row, col, value)) {
      // validate the row and column
      const grids = this.state.grids.reduce((acc, grids) => acc.concat(grids), []);
      const isValid = grids.some(otherGrid => otherGrid !== grid && (
        otherGrid.columns(row).every(n => n !== value) ||
        otherGrid.rows(col).every(n => n !== value)
      ));
      grid.setValidation(row, col, isValid);
    }

    this.setState(({
      grids
    }) => ({
      grids: [...grids]
    }));
  }

  render() {
    return (
      <div className='board'>
        {this.state.grids.map(row => (
          row.map(grid => (
            <SubGrid points={grid.toPoints()} onChange={(data) => this.#handleChange({ grid, ...data })} />
          ))
        ))}
      </div>
    );
  }
}
