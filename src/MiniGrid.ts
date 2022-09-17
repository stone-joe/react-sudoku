export class MiniGrid {
  #grid: number[][] = new Array(3).fill(new Array(3));
  constructor(numbers: number[]) {
    if (numbers.length > 9) {
      throw new RangeError(`Only 9 numbers are allowed in a mini-grid. Got ${numbers}`);
    } else {
      for (let r = 0; r < this.#grid.length; r++) {
        const len = this.#grid[r].length;
        this.#grid[r] = numbers.slice(r * len, (r * len) + len);
      }
    }
  }
  get grid(): number[][] {
    return this.#grid.slice(0).map(row => row.slice(0));
  }
  columns(row = 0): number[] {
    return this.#grid[row];
  }
  rows(column = 0): number[] {
    return this.#grid.map(row => row[column]);
  }
  at(row = 0, column = 0): number {
    return this.#grid[row][column];
  }
  add(row: number, col: number, n: number): boolean {
    const numbers = this.#grid.reduce((acc, row) => acc.concat(row), []);
    if (numbers.indexOf(n) > -1) {
      return false;
    } else {
      this.#grid[row][col] = n;
      return true;
    }
  }
}