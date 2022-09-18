import { MiniGrid } from '../model/MiniGrid';

export function setValidators(grids: MiniGrid[][], miniGridSideLength: number) {
  grids.forEach(row => {
    row.forEach((grid, cIndex) => {
      // add cells for other mini grid rows as validators
      for (const g of row) {
        if (g !== grid) {
          for (let r = 0, n = miniGridSideLength; r < n; r++) {
            grid.row(r).forEach(cell => cell.setValidators(g.row(r)));
          }
        }
      }

      for(const g of grids.map(row => row[cIndex])) {
        if (g !== grid) {
          for (let c = 0, n = miniGridSideLength; c < n; c++) {
            grid.column(c).forEach(cell => cell.setValidators(g.column(c)));
          }
        }
      }
    });
  });
}