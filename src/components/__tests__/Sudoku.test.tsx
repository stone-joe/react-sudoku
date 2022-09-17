import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Sudoku from '../Sudoku';

describe('sudoku', () => {
  let screen: RenderResult;
  beforeEach(() => {
    screen = render(<Sudoku />);
  });
  it('should render a 9x9 board with inputs set to 0', () => {
    // test
    const { getAllByDisplayValue } = screen;
    // verify
    expect(getAllByDisplayValue('0')).toHaveLength(81);
  });
  it('should update the value of the selected input', () => {
    // test
    const { getAllByDisplayValue } = screen;
    const input = getAllByDisplayValue('0')[6] as HTMLInputElement;
    fireEvent.keyUp(input, { target: { value: '7' } });
    // verify
    expect(input.value).toEqual('7');
  });
  it('should highlight the same number in the same row as invalid', () => {
    // test
    const { getAllByDisplayValue } = screen;
    const inputs = getAllByDisplayValue('0');
    // same row
    const input1 = inputs[10];
    const input2 = inputs[0];
    fireEvent.keyUp(input1, '8');
    fireEvent.keyUp(input2, '8');
    // verify
    expect(input1).toHaveClass('invalid');
    expect(input2).toHaveClass('invalid');
    // test changing back
    fireEvent.keyUp(input1, '6');
    // verify
    expect(input1).not.toHaveClass('invalid');
    expect(input2).not.toHaveClass('invalid');
  });
});
