import styles from "../../styles/games/Tetris.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

import { TetrisManager } from "./tetris/TetrisManager";

const Tetris: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const arrTetris: Array<TetrisManager> = [];
    const playerElements = document.querySelectorAll(".player");
    [...playerElements].forEach((playerElement) => {
      const tetrisManager = new TetrisManager(playerElement);
      tetrisManager.render();
      arrTetris.push(tetrisManager);
    });

    const hKeyDown = (event: KeyboardEvent) => {
      [["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "]].forEach(
        (key, index) => {
          const player = arrTetris[index].player;
          if (event.type === "keydown") {
            if (event.key === key[0]) {
              player.move(-1);
            } else if (event.key === key[1]) {
              player.move(1);
            } else if (event.key === key[2]) {
              player.rotate(1);
            }
          }

          if (event.key === key[3]) {
            if (event.type === "keydown") {
              if (player.dropInterval !== player.DROP_FAST) {
                player.drop();
                player.dropInterval = player.DROP_FAST;
              }
            } else {
              player.dropInterval = player.DROP_SLOW;
            }
          }

          if (event.key === key[4]) {
            if (event.type === "keydown") {
              if (player.dropInterval !== player.DROP_FAST_FAST) {
                player.drop();
                player.dropInterval = player.DROP_FAST_FAST;
              }
            } else {
              player.dropInterval = player.DROP_SLOW;
            }
          }
        }
      );
    };

    canvas.addEventListener("keydown", hKeyDown);

    return () => {
      canvas.removeEventListener("keydown", hKeyDown);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className="player">
        <div className="score"></div>
        <canvas ref={canvasRef} tabIndex={0} width={240} height={400}></canvas>
      </div>
    </section>
  );
};
export default Tetris;
