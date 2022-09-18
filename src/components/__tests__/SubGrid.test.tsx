import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MiniGrid } from '../../model/MiniGrid';
import { SubGrid } from '../SubGrid';

describe('sub-grid', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render 9 inputs', async () => {
    // setup
    const grid = new MiniGrid([
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]);
    // test
    const { getAllByDisplayValue } = render(<SubGrid cells={grid.cells} onChange={jest.fn()} />);
    // verify
    expect(getAllByDisplayValue('')).toHaveLength(9);
  });
  it('should render the information provided in the mini grid', async () => {
    // setup
    const grid = new MiniGrid([
      5, 7, 8,
      0, 0, 9,
      4, 0, 1
    ]);
    // test
    const { getByDisplayValue, getAllByDisplayValue } = render(<SubGrid cells={grid.cells} onChange={jest.fn()} />);
    // verify
    expect(getByDisplayValue('5')).not.toHaveClass('invalid');
    expect(getByDisplayValue('7')).not.toHaveClass('invalid');
    expect(getByDisplayValue('8')).not.toHaveClass('invalid');
    expect(getByDisplayValue('9')).not.toHaveClass('invalid');
    expect(getByDisplayValue('4')).not.toHaveClass('invalid');
    expect(getByDisplayValue('1')).not.toHaveClass('invalid');
    const empties = getAllByDisplayValue('');
    expect(empties).toHaveLength(3);
    empties.forEach(empty => {
      expect(empty).not.toHaveClass('invalid');
    });
  });
  it('should highlight invalid cells', async () => {
    // setup
    const grid = new MiniGrid([
      5, 7, 8,
      0, 5, 9,
      4, 0, 1
    ]);
    // test
    const { getByDisplayValue, getAllByDisplayValue } = render(<SubGrid cells={grid.cells} onChange={jest.fn()} />);
    // verify
    expect(getAllByDisplayValue('5')[0]).toHaveClass('invalid');
    expect(getAllByDisplayValue('5')[1]).toHaveClass('invalid');
    expect(getByDisplayValue('4')).not.toHaveClass('invalid');
  });
  it('should emit when a change occurs', () => {
    // setup
    const grid = new MiniGrid([
      5, 7, 8,
      0, 0, 9,
      4, 0, 1
    ]);
    const handler = jest.fn();
    const { getAllByDisplayValue } = render(<SubGrid cells={grid.cells} onChange={handler} />);
    // test
    fireEvent.input(getAllByDisplayValue('')[1], {
      target: {
        value: '6'
      }
    });
    // verify
    expect(handler).toHaveBeenCalledWith({
      cell: grid.cells[4],
      value: 6
    });
  });
  it('should only keep the last digit', () => {
    // setup
    const grid = new MiniGrid([
      5, 7, 8,
      0, 0, 9,
      4, 0, 1
    ]);
    const handler = jest.fn();
    const { getAllByDisplayValue } = render(<SubGrid cells={grid.cells} onChange={handler} />);
    // test
    fireEvent.input(getAllByDisplayValue('')[1], {
      target: {
        value: '6789'
      }
    });
    // verify
    expect(handler).toHaveBeenCalledWith({
      cell: grid.cells[4],
      value: 9
    });
  });
});