import { Player } from "./Player";

export class Arena {
  matrix: Array<Array<number>>;

  constructor(w: number, h: number) {
    this.matrix = this.create(w, h);
  }

  create(w: number, h: number) {
    const matrix = [];

    while (h--) {
      matrix.push(new Array(w).fill(0));
    }

    return matrix;
  }

  clear() {
    this.matrix.forEach((row) => {
      row.fill(0);
    });
  }

  isCollide(player: Player) {
    for (let y = 0; y < player.matrix.length; y++) {
      for (let x = 0; x < player.matrix[y].length; x++) {
        if (
          player.matrix[y][x] !== 0 &&
          (this.matrix[y + player.pos.y] &&
            this.matrix[y + player.pos.y][x + player.pos.x]) !== 0
        ) {
          return true;
        }
      }
    }
  }

  merge(player: Player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  sweep() {
    let rowCount = 1;
    let score = 0;

    outer: for (let y = this.matrix.length - 1; y > 0; y--) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      y++;

      score += rowCount * 10;
      rowCount *= 2;
    }

    return score;
  }
}
