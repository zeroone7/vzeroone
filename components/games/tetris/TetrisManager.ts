import { Arena } from "./Arena";
import { Player } from "./Player";

export class TetrisManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  arena: Arena;
  player: Player;
  colors: Array<string>;
  lastTime: number;

  constructor(private element: Element) {
    this.canvas = this.element.querySelector("canvas")!;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.scale(20, 20);

    this.arena = new Arena(12, 20);
    this.player = new Player(this);

    this.colors = [
      "white",
      "crimson",
      "dodgerblue",
      "violet",
      "limegreen",
      "purple",
      "orange",
      "pink",
    ];

    this.lastTime = 0;
  }

  render() {
    this.updateScore(0);

    const update = (time = 0) => {
      const deltaTime = time - this.lastTime;
      this.lastTime = time;

      this.player.update(deltaTime);
      this.draw();

      requestAnimationFrame(update);
    };
    update();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
    this.drawMatrix(this.player.matrix, this.player.pos);
  }

  drawMatrix(matrix: Array<Array<number>>, pos: { x: number, y: number }) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.ctx.fillStyle = this.colors[value];
          this.ctx.fillRect(x + pos.x, y + pos.y, 1, 1);
        }
      });
    });
  }

  updateScore(score: number) {
    (this.element.querySelector(".score") as Element).textContent =
      String(score);
  }
}
