import { CellI } from './Cell.js';

export class Cursor {
  #keys = {
    left: ['ArrowLeft', 'a'],
    right: ['ArrowRight', 'd', 'e'],
    up: ['ArrowUp', 'w', ','],
    down: ['ArrowDown', 's', 'o']
  };
  row: number = 0;
  col: number = 0;
  size: number = 9;
  #timer: any;
  #disabled: Set<CellI> = new Set();
  debounce(): Promise<void> {
    if (!this.#timer) {
      return new Promise(resolve => {
        this.#timer = setTimeout(() => {
          this.#timer = null;
          resolve();
        }, 50);
      });
    } else {
      return Promise.reject();
    }
  }
  process(key: string) {
    if (this.#keys.left.includes(key)) {
      this.left();
    } else if (this.#keys.right.includes(key)) {
      this.right();
    } else if (this.#keys.up.includes(key)) {
      this.up();
    } else if (this.#keys.down.includes(key)) {
      this.down();
    }
    if (this.#checkDisabledBox()) {
      this.process(key);
    }
  }
  left() {
    this.col--;
    if (this.col < 0) {
      this.row--;
      this.col = this.size;
    }
  }
  right() {
    this.col++;
    if (this.col === this.size) {
      this.row++;
      this.col = 0;
    }
  }
  up() {
    this.row--;
  }
  down() {
    this.row++;
  }
  reset() {
    this.#disabled.clear();
    this.col = 0;
    this.row = 0;
  }
  #checkDisabledBox(): boolean {
    for (const cell of this.#disabled) {
      if (cell.col === this.col && cell.row === this.row) {
        return true;
      }
    }
    return false;
  }
  disabled(cell: CellI) {
    this.#disabled.add(cell);
  }
}