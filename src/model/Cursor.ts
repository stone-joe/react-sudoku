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
  timer: any;
  debounce(): Promise<void> {
    if (!this.timer) {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          this.timer = null;
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
}