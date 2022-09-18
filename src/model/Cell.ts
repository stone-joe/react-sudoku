import { Point } from './Point';

export interface CellI extends Point {
  valid: boolean;
}

export class Cell implements CellI {
  static create(opts: Point & { validators?: Cell[] }): Cell {
    return new Cell(opts);
  }

  row: number = 0;
  col: number = 0;
  value: number = 0;
  #validators: Set<Cell> = new Set();
  constructor(opts: Point & { validators?: Cell[] }) {
    this.row = opts.row;
    this.col = opts.col;
    this.value = opts.value;
    this.setValidators(opts.validators || []);
  }

  setValidators(cells: Cell[]) {
    cells.forEach(this.#validators.add.bind(this.#validators));
  }

  clear() {
    this.#validators.clear();
  }

  get validators() {
    return Array.from(this.#validators)
  }

  get valid(): boolean {
    for (const cell of this.#validators) {
      if (cell.value && this.value && cell.value === this.value) {
        return false;
      }
    }
    return true;
  }

  toJSON(): CellI {
    return {
      row: this.row,
      col: this.col,
      value: this.value,
      valid: this.valid
    };
  }
}