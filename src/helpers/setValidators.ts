import { MiniGrid } from '../model/MiniGrid';

export function setValidators(grids: MiniGrid[], miniGridSideLength: number) {
  grids.forEach((grid, gridIndex) => {
    // add each cell in the same row as a validator
    for (const otherGrid of grids.slice(Math.floor(gridIndex / miniGridSideLength), Math.floor(gridIndex / miniGridSideLength) + miniGridSideLength)) {
      if (otherGrid !== grid) {
        for (let i = 0; i < miniGridSideLength; i++) {
          grid.row(i).forEach(cell => {
            cell.setValidators(otherGrid.row(i));
          });
        }
      }
    }

    // add the columns as validators
    const columnGrids = [];
    // check ahead
    for (let i = gridIndex + miniGridSideLength, n = grids.length; i <= n; i += miniGridSideLength) {
      if (grids[i]) {
        columnGrids.push(grids[i]);
      }
    }
    // check behind
    for (let i = gridIndex - miniGridSideLength; i >= 0; i -= miniGridSideLength) {
      if (grids[i]) {
        columnGrids.push(grids[i]);
      }
    }

    for (const otherGrid of columnGrids) {
      if (otherGrid !== grid) {
        for (let i = 0; i < miniGridSideLength; i++) {
          grid.column(i).forEach(cell => {
            cell.setValidators(otherGrid.column(i));
          });
        }
      }
    }
  });
}