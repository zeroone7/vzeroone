import { Arena } from "./Arena";
import { TetrisManager } from "./TetrisManager";

type Point = {
  x: number;
  y: number;
};

export class Player {
  tetrisManager: TetrisManager;
  arena: Arena;
  matrix: Array<Array<number>>;
  DROP_SLOW: number;
  DROP_FAST: number;
  DROP_FAST_FAST: number;
  dropCounter: number;
  dropInterval: number;
  pos: Point;
  score: number;

  constructor(tetrisManager: TetrisManager) {
    this.tetrisManager = tetrisManager;
    this.arena = tetrisManager.arena;

    this.DROP_SLOW = 1000;
    this.DROP_FAST = 50;
    this.DROP_FAST_FAST = 1;
    this.dropCounter = 0;
    this.dropInterval = this.DROP_SLOW;
    this.pos = { x: 0, y: 0 };
    this.matrix = new Array(new Array().fill(0));
    this.score = 0;

    this.reset();
  }

  createPiece(type: string) {
    if (type === "T") {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
    } else if (type === "O") {
      return [
        [2, 2],
        [2, 2],
      ];
    } else if (type === "L") {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
    } else if (type === "J") {
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
    } else if (type === "I") {
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ];
    } else if (type === "S") {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (type === "Z") {
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  update(deltaTime: number) {
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }

  drop() {
    this.pos.y++;

    if (this.arena.isCollide(this)) {
      this.pos.y--;
      this.arena.merge(this);
      this.reset();
      this.score += this.arena.sweep();
      this.tetrisManager.updateScore(this.score);
    }

    this.dropCounter = 0;
  }

  move(dir: number) {
    this.pos.x += dir;
    if (this.arena.isCollide(this)) {
      this.pos.x -= dir;
    }
  }

  rotate(dir: number) {
    const pos = this.pos.x;
    let offset = 1;

    this._rotateMatrix(this.matrix, dir);

    while (this.arena.isCollide(this)) {
      this.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > this.matrix[0].length) {
        this._rotateMatrix(this.matrix, -dir);
        this.pos.x = pos;
        return;
      }
    }
  }

  _rotateMatrix(matrix: Array<Array<number>>, dir: number) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < y; x++) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }

    if (dir > 0) {
      matrix.forEach((row) => {
        row.reverse();
      });
    } else {
      matrix.reverse();
    }
  }

  reset() {
    const pieces = "ILJOTSZ";
    this.matrix = this.createPiece(
      pieces[(pieces.length * Math.random()) | 0],
    )!;
    this.pos.x =
      ((this.arena.matrix[0].length / 2) | 0) -
      ((this.matrix[0].length / 2) | 0);
    this.pos.y = 0;

    if (this.arena.isCollide(this)) {
      this.arena.clear();
      this.score = 0;
      this.tetrisManager.updateScore(this.score);
    }
  }
}
