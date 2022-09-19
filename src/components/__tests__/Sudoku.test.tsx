import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import Sudoku from '../Sudoku';
import { MiniGrid } from '../../model/MiniGrid';
import { setValidators } from '../../helpers/setValidators';

jest.mock('../../model/sudoku.js', () => ({
  __esModule: true,
  default: {
    generate(level: 'easy' | 'medium' | 'hard'): string {
      return {
        easy: '97.8546232583164.96349725..86372195459746....14259....425137896.196.5.4..86249..5',
        medium: '3..7415..7125..4.9.46..81....8457.6.2.5619.4346..8279....895.141542.6.78893.74652',
        hard: '4579...36..9.6...7..175...8..2.9..7..7........1..7.6..123.4.76959862731474613982.'
      }[level];
    }
  }
}));

describe('sudoku', () => {
  let screen: RenderResult;
  beforeEach(() => {
    screen = render(<Sudoku />);
  });
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });
  it('should render a 9x9 board with inputs set to 0', async () => {
    // test
    const { getAllByDisplayValue, getAllByText } = screen;
    // verify
    expect(getAllByDisplayValue('')).toHaveLength(81);
    expect(getAllByText('Select a level', {
      exact: false
    })[0]).toBeVisible();
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
  it('should generate a medium level sudoku board', () => {
    // test
    const { getAllByText, getAllByRole } = render(<Sudoku />);
    fireEvent.click(getAllByText('Medium')[0]);
    // verify
    expect(getAllByRole('dialog', { hidden: true })[0]).toHaveStyle('display: none');
    expect(document.querySelector('input[data-row="0"][data-col="0"]')).toHaveValue('3');
    expect(document.querySelector('input[data-row="0"][data-col="1"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="0"][data-col="2"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="0"][data-col="3"]')).toHaveValue('7');
    expect(document.querySelector('input[data-row="0"][data-col="4"]')).toHaveValue('4');
    expect(document.querySelector('input[data-row="0"][data-col="5"]')).toHaveValue('1');
    expect(document.querySelector('input[data-row="0"][data-col="6"]')).toHaveValue('5');
    expect(document.querySelector('input[data-row="0"][data-col="7"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="0"][data-col="8"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="1"][data-col="0"]')).toHaveValue('7');
    expect(document.querySelector('input[data-row="1"][data-col="1"]')).toHaveValue('1');
    expect(document.querySelector('input[data-row="1"][data-col="2"]')).toHaveValue('2');
    expect(document.querySelector('input[data-row="1"][data-col="3"]')).toHaveValue('5');
    expect(document.querySelector('input[data-row="1"][data-col="4"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="1"][data-col="5"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="1"][data-col="6"]')).toHaveValue('4');
    expect(document.querySelector('input[data-row="1"][data-col="7"]')).toHaveValue('');
    expect(document.querySelector('input[data-row="1"][data-col="8"]')).toHaveValue('9');
  });
  it('should generate a sudoku board with none of the inputs marked as invalid', () => {
    // test
    const { getAllByText } = render(<Sudoku />);
    fireEvent.click(getAllByText('Easy')[0]);
    // verify
    expect(document.querySelectorAll('input.invalid')).toHaveLength(0);
  });
  it('should check that the game is completed and display a winning animation', () => {
    // setup
    cleanup();
    const fakeMiniGrid = MiniGrid.create([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    // mock
    jest.spyOn(MiniGrid, 'create').mockReturnValue(fakeMiniGrid);
    jest.spyOn(fakeMiniGrid, 'valid').mockReturnValue(true);
    // test
    const { getAllByDisplayValue, getAllByText } = render(<Sudoku />);
    fireEvent.click(getAllByText('Medium')[0]);
    fireEvent.keyUp(getAllByDisplayValue('')[0], {
      key: '9'
    });
    // verify
    expect(getAllByText('Great job', {
      exact: false
    })[0]).toBeVisible();
    expect(document.querySelector('.confetti-1')).toBeInTheDocument();
    // test new game
    fireEvent.click(getAllByText('Hard')[0]);
    expect(document.querySelector('.confetti-1')).toBeNull();
    expect(getAllByText('Select a level', { exact: false })[0]).not.toBeVisible();
  });
});
