import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

import Utils from "../lib/utils";

const CircletoCircleCollision: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    const r0 = { x: width / 2, y: height / 2, width: -100, height: -100 };
    const r1 = { x: 0, y: 0, width: -100, height: -200 };

    ctx.fillRect(r0.x, r0.y, r0.width, r0.height);
    ctx.fillRect(r1.x, r1.y, r1.width, r1.height);

    const hMouseMove = (event: MouseEvent) => {
      ctx.clearRect(0, 0, width, height);

      r1.x = event.clientX - 50;
      r1.y = event.clientY - 100;

      if (Utils.rectIntersect(r0, r1)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.fillRect(r0.x, r0.y, r0.width, r0.height);
      ctx.fillRect(r1.x, r1.y, r1.width, r1.height);
    };

    canvas.addEventListener("mousemove", hMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", hMouseMove);
    };
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default CircletoCircleCollision;
