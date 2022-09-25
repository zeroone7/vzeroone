import styles from "../../styles/games/Tetris.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

const Tetris: NextPage = () => {
  window.onload = () => {

  const canvas = document.querySelector("canvas")!;
  const ctx = canvas.getContext("2d")!;
  const width = canvas.width;
  const height = canvas.height;

  const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];

  const player = {
    matrix,
    pos: { x: 5, y: 5 },
  };

  let lastTime = 0;

  ctx.scale(20, 20);

  const drawMatrix = (
    matrix: Array<Array<number>>,
    offset: { x: number; y: number }
  ) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.fillStyle = "red";
          ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  };

  const draw = () => {
    // ctx.clearRect(0, 0, width, height);

    drawMatrix(player.matrix, player.pos);
  };

  const update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    console.log(deltaTime);

    draw();
    requestAnimationFrame(update);
  };
  update();
  }

  return (
    <section className={styles.section}>
      <canvas tabIndex={0} width={240} height={400}></canvas>
    </section>
  );
};

export default Tetris;
