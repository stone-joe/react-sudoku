import { MiniGrid } from '../MiniGrid';

describe('MiniGrid', () => {
  it('should generate a grid with correct row/col', () => {
    // test
    const grid = new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]);
    expect(grid.at(0, 0)).toEqual(grid.cells[0]);
    expect(grid.at(0, 1)).toEqual(grid.cells[1]);
    expect(grid.at(0, 2)).toEqual(grid.cells[2]);
    expect(grid.at(1, 0)).toEqual(grid.cells[3]);
    expect(grid.at(1, 1)).toEqual(grid.cells[4]);
    expect(grid.at(1, 2)).toEqual(grid.cells[5]);
    expect(grid.at(2, 0)).toEqual(grid.cells[6]);
    expect(grid.at(2, 1)).toEqual(grid.cells[7]);
    expect(grid.at(2, 2)).toEqual(grid.cells[8]);
  });
  it('should return numbers in the provided column', () => {
    expect(new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]).column(1)).toEqual([
      expect.objectContaining({ row: 0, col: 1, value: 2 }),
      expect.objectContaining({ row: 1, col: 1, value: 0 }),
      expect.objectContaining({ row: 2, col: 1, value: 8 })
    ]);
  });
  it('should return numbers in the provided row', () => {
    expect(new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]).row(2)).toEqual([
      expect.objectContaining({ row: 2, col: 0, value: 7 }),
      expect.objectContaining({ row: 2, col: 1, value: 8 }),
      expect.objectContaining({ row: 2, col: 2, value: 9 })
    ]);
  });
  it('should set validate against all cells in the grid', () => {
    const grid = new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]);
    // test and verify
    expect(grid.update(1, 1, 2)).toBe(false);
  });
});