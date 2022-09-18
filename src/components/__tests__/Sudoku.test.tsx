import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import Sudoku, { setValidators } from '../Sudoku';
import { MiniGrid } from '../../model/MiniGrid';

describe('sudoku', () => {
  let screen: RenderResult;
  beforeEach(() => {
    screen = render(<Sudoku />);
  });
  afterEach(() => {
    cleanup();
  });
  describe('set validators', () => {
    it('should set the correct validators', () => {
      // setup
      const size = 3;
      const grids = new Array(size * size).fill(0).map(() => new MiniGrid([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]));
      // test
      setValidators(grids, size);
      // validate
      expect(grids[0].cells[0].validators).toEqual(expect.arrayContaining([
        // row
        grids[1].cells[0],
        grids[1].cells[1],
        grids[1].cells[2],
        grids[2].cells[0],
        grids[2].cells[1],
        grids[2].cells[2],
        // column
        grids[3].cells[0],
        grids[3].cells[3],
        grids[3].cells[6],
        grids[6].cells[0],
        grids[6].cells[3],
        grids[6].cells[6],
      ]));
      expect(grids[4].cells[2].validators).toEqual(expect.arrayContaining([
        // row - left
        grids[3].cells[0],
        grids[3].cells[1],
        grids[3].cells[2],
        // row - right
        grids[5].cells[0],
        grids[5].cells[1],
        grids[5].cells[2],
        // column - up
        grids[1].cells[2],
        grids[1].cells[5],
        grids[1].cells[8],
        // column - down
        grids[7].cells[2],
        grids[7].cells[5],
        grids[7].cells[8],
      ]));
    });
  });
  it('should render a 9x9 board with inputs set to 0', () => {
    // test
    const { getAllByDisplayValue } = screen;
    // verify
    expect(getAllByDisplayValue('')).toHaveLength(81);
  });
  it('should update the value of the selected input', () => {
    // test
    const { getAllByDisplayValue } = screen;
    const input = getAllByDisplayValue('')[6] as HTMLInputElement;
    fireEvent.keyUp(input, { target: { value: '7' } });
    // verify
    expect(input.value).toEqual('7');
  });
  it('should highlight the same number in the same row as invalid', () => {
    // test
    const { getAllByDisplayValue } = screen;
    const inputs = getAllByDisplayValue('');
    // same row
    const input1 = inputs[18];
    const input2 = inputs[0];
    fireEvent.keyUp(input1, {
      key: '8'
    });
    fireEvent.keyUp(input2, {
      key: '8'
    });
    // verify
    expect(input1).toHaveClass('invalid');
    expect(input2).toHaveClass('invalid');
    // test changing back
    fireEvent.keyUp(input1, {
      key: '6'
    });
    // verify
    expect(input1).not.toHaveClass('invalid');
    expect(input2).not.toHaveClass('invalid');
  });
  it('should highlight the same input in the same subgrid as invalid', () => {
    // test
    const { getAllByDisplayValue } = screen;
    const inputs = getAllByDisplayValue('');
    // same column
    const input1 = inputs[0]; // grid 1, row 1, cell 1
    const input2 = inputs[7]; // grid 1, row 3, cell 2
    fireEvent.keyUp(input1, {
      key: '8'
    });
    fireEvent.keyUp(input2, {
      key: '8'
    });
    // verify
    expect(input1).toHaveClass('invalid');
    expect(input2).toHaveClass('invalid');
    // test changing back
    fireEvent.keyUp(input1, {
      key: '6'
    });
    // verify
    expect(input1).not.toHaveClass('invalid');
    expect(input2).not.toHaveClass('invalid');
  });
  it('should highlight the same input in the same column as invalid', () => {
    // test
    const { getAllByDisplayValue } = screen;
    const inputs = getAllByDisplayValue('');
    // same column
    const input1 = inputs[10]; // grid 2, row 1, cell 2
    const input2 = inputs[64]; // grid 8, row 1, cell 2
    fireEvent.keyUp(input1, {
      key: '8'
    });
    fireEvent.keyUp(input2, {
      key: '8'
    });
    // verify
    expect(input1).toHaveClass('invalid');
    expect(input2).toHaveClass('invalid');
    // test changing back
    fireEvent.keyUp(input1, {
      key: '6'
    });
    // verify
    expect(input1).not.toHaveClass('invalid');
    expect(input2).not.toHaveClass('invalid');
  });
});
