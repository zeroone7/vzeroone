import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

import Utils from "../lib/utils";

const CircletoCircleCollision: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    const fl = 300;
    const numShapes = 100;
    const shapes: Array<{ x: number; y: number; z: number; char: string }> = [];

    let hFrame = 0;

    for (let i = 0; i < numShapes; i++) {
      shapes[i] = {
        x: Utils.randomRange(-1000, 1000),
        y: Utils.randomRange(-1000, 1000),
        z: Utils.randomRange(0, 10000),
        char: String.fromCharCode(Utils.randomRange(65, 91)),
      };
    }

    ctx.translate(width / 2, height / 2);
    ctx.font = "200px Arial";

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      for (const shape of shapes) {
        const perspective = fl / (fl + shape.z);

        ctx.save();
          ctx.translate(shape.x * perspective, shape.y * perspective);
          ctx.scale(perspective, perspective);

          ctx.fillText(shape.char, -100, -100);
        ctx.restore();

        shape.z -= 5;
        if (shape.z < 0) {
          shape.z = 10000;
        }
      }

      hFrame = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(hFrame);
    }
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default CircletoCircleCollision;