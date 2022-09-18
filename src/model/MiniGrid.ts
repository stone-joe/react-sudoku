import { Cell, CellI } from './Cell';

export class MiniGrid {
  static create(numbers: number[][], side = 3): MiniGrid {
    return new MiniGrid(numbers, side);
  }

  #grid: Cell[][] = [];
  // the number of cells in a column or row
  #side: number = 3;

  constructor(numbers: number[][], side = 3) {
    this.#grid = numbers.map((row, rIndex) => (
      row.map((n, i) => Cell.create({
        row: rIndex,
        col: i,
        value: n || 0
      }))
    ));
    this.#grid.forEach(row => {
      row.forEach(cell => {
        cell.setValidators(this.cells.filter(c => c !== cell));
      });
    });
    this.#side = side;
  }

  get cells(): Cell[] {
    return this.#grid.reduce((acc, row) => acc.concat(row), []);
  }

  valid(): boolean {
    return this.cells.every(cell => cell.value > 0 && cell.valid);
  }

  row(row = 0): Cell[] {
    return this.#grid[row];
  }

  column(column = 0): Cell[] {
    return this.#grid.map(row => row[column]);
  }

  at(row = 0, column = 0): Cell {
    if (row >= this.#side || column >= this.#side) {
      throw new RangeError(`Provided indices must be less than ${this.#side}. Got ${row}, ${column}`);
    }

    return this.#grid[row][column];
  }

  reset(row: number, column: number) {
    if (row > -1 && column > -1) {
      this.at(row, column).value = 0;
    } else {
      this.#grid.forEach(row => {
        row.forEach(cell => {
          cell.value = 0;
        });
      });
    }
  }

  update(cell: CellI, n: number): boolean {
    const c = this.at(cell.row, cell.col);
    c.value = n;
    return c.valid;
  }

  toJSON(): { cells: CellI[], valid: boolean } {
    return {
      cells: this.cells.map(c => c.toJSON()),
      valid: this.valid()
    };
  }
}