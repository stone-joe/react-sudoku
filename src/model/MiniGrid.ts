import { Cell } from './Cell';

export class MiniGrid {
  #grid: Cell[] = [];
  // the number of cells in a column or row
  #side: number = 3;

  constructor(numbers: number[], side = 3) {
    const total = side * side;
    if (numbers.length !== total) {
      throw new RangeError(`Only ${total} numbers are allowed in a mini-grid. Got ${numbers}`);
    } else {
      this.#grid = new Array(total).fill(0).map((n, i) => new Cell({
        row: Math.floor(i / side),
        col: i - side * Math.floor(i / side),
        value: numbers[i] || 0
      }));
      this.#grid.forEach(cell => {
        cell.setValidators(this.#grid.filter(c => c !== cell));
      });
      this.#side = side;
    }
  }

  get cells(): Cell[] {
    return this.#grid.slice(0);
  }
  
  valid(): boolean {
    return this.#grid.every(cell => cell.valid);
  }

  row(row = 0): Cell[] {
    return this.#grid.slice(this.#side * row, this.#side * row + this.#side);
  }

  column(column = 0): Cell[] {
    return new Array(this.#side)
      .fill(0)
      .map((n, i) => column + i * this.#side)
      .map(i => this.#grid[i]);
  }

  at(row = 0, column = 0): Cell {
    if (row >= this.#side || column >= this.#side) {
      throw new RangeError(`Provided indices must be less than ${this.#side}. Got ${row}, ${column}`);
    }

    return this.#grid.find(cell => cell.row === row && cell.col === column) as Cell;
  }

  reset(row: number, column: number) {
    if (row > -1 && column > -1) {
      this.at(row, column).value = 0;
    } else {
      this.#grid.forEach(cell => {
        cell.value = 0;
      });
    }
  }

  update(cell: Cell, n: number): boolean {
    cell.value = n;
    return cell.valid;
  }
}