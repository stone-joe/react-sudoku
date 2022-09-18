import { MiniGrid } from '../../model/MiniGrid';
import { setValidators } from '../setValidators';

describe('set validators', () => {
  it('should set the correct validators', () => {
    // setup
    const size = 3;
    const grids = new Array(size).fill(0).map(() => (
      new Array(size).fill(0).map(() => (
        new MiniGrid([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ])
      ))
    ));
    // test
    setValidators(grids, size);
    // validate
    expect(grids[0][0].at(0, 0).validators).toHaveLength(20);
    expect(grids[0][0].at(0, 0).validators).toStrictEqual([
      // all cells in the same 3x3 grid
      ...grids[0][0].cells.filter(c => c !== grids[0][0].at(0, 0)),
      // same row
      ...grids[0][1].row(0),
      ...grids[0][2].row(0),
      // same column
      ...grids[1][0].column(0),
      ...grids[2][0].column(0),
    ]);
    expect(grids[1][2].at(2, 2).validators).toHaveLength(20);
    expect(grids[1][2].at(2, 2).validators).toStrictEqual([
      // all cells in the same 3x3 grid
      ...grids[1][2].cells.filter(c => c !== grids[1][2].at(2, 2)),
      // same row
      ...grids[1][0].row(2),
      ...grids[1][1].row(2),
      // same column
      ...grids[0][2].column(2),
      ...grids[2][2].column(2),
    ]);
  });
});