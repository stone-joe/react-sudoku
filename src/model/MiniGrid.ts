import { Point } from "./Point";

export class MiniGrid {
  #grid: number[][] = new Array(3).fill(3).map(() => new Array(3).fill(0));
  #validations: boolean[][] = new Array(3).fill(true).map(() => new Array(3).fill(true));
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
  get validations(): boolean[][] {
    return this.#validations.map(row => row.slice(0));
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
  reset(row: number, column: number) {
    if (row || column) {
      this.#grid[row][column] = 0;
    } else {
      this.#grid.forEach(row => row.fill(0));
      this.#validations.forEach(row => row.fill(true));
    }
  }
  setValidation(row: number, column: number, valid: boolean) {
    this.#validations[row][column] = valid;
  }
  add(row: number, col: number, n: number): boolean {
    const numbers = this.#grid.reduce((acc, row) => acc.concat(row), []);
    this.#grid[row][col] = n;
    // invert because if the number is found in another spot, the added
    // number is not valid
    const isValid = !(numbers.indexOf(n) > -1);
    this.setValidation(row, col, isValid);
    return isValid;
  }
  toPoints(): Point[][] {
    return this.#grid.map((row, rIndex) => (
      row.map((cell, cIndex) => ({
        row: rIndex,
        col: cIndex,
        value: cell,
        valid: this.#validations[rIndex][cIndex]
      }))
    ));
  }
}