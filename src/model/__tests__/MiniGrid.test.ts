import { MiniGrid } from '../MiniGrid';

describe('MiniGrid', () => {
  it('should return numbers in the provided column from all rows', () => {
    expect(new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]).rows(1)).toEqual([2, 0, 8]);
  });
  it('should return numbers in the provided row from all columns', () => {
    expect(new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]).columns(2)).toEqual([7, 8, 9]);
  });
  it('should set the validation of the selected point', () => {
    const grid = new MiniGrid([
      1, 2, 3,
      4, 0, 6,
      7, 8, 9
    ]);
    grid.setValidation(0, 1, false);
    expect(grid.validations[0][0]).toBe(true);
    expect(grid.validations[0][1]).toBe(false);
    expect(grid.validations[0][2]).toBe(true);
    expect(grid.validations[1][0]).toBe(true);
    expect(grid.validations[1][1]).toBe(true);
    expect(grid.validations[1][2]).toBe(true);
    expect(grid.validations[2][0]).toBe(true);
    expect(grid.validations[2][1]).toBe(true);
    expect(grid.validations[2][2]).toBe(true);
  });
  describe('add', () => {
    it('should return false if the new number exists', () => {
      expect(new MiniGrid([
        1, 2, 3,
        4, 0, 6,
        7, 8, 9
      ]).add(1, 1, 4)).toBe(false);
    });
    it('should return true if the number can be added', () => {
      expect(new MiniGrid([
        1, 2, 3,
        4, 0, 6,
        7, 8, 9
      ]).add(1, 1, 5)).toBe(true);
    });
  });
});