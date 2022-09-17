import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MiniGrid } from '../../model/MiniGrid';
import { SubGrid } from '../SubGrid';

describe('sub-grid', () => {
  afterEach(() => {
    cleanup();
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
    const empties = getAllByDisplayValue('0');
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
  it('should replace the current value with the selected value', () => {
    // setup
    const grid = new MiniGrid([
      5, 7, 8,
      0, 0, 9,
      4, 0, 1
    ]);
    const { getByDisplayValue } = render(<SubGrid cells={grid.cells} onChange={jest.fn()} />);
    // test
    const input = getByDisplayValue('5');
    fireEvent.keyUp(input, {
      target: {
        value: '6'
      }
    });
    // verify
    expect(input).toHaveValue(6);
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
    fireEvent.keyUp(getAllByDisplayValue('0')[1], {
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
});