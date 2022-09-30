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

    const c0 = {
      x: width / 2,
      y: height / 2,
      radius: 50 + Math.random() * 100,
    };
    const c1 = {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 50 + Math.random() * 100,
    };

    ctx.beginPath();
    ctx.arc(c0.x, c0.y, c0.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(c1.x, c1.y, c1.radius, 0, Math.PI * 2, false);
    ctx.fill();

    const hPointerMove = (event: PointerEvent) => {
      ctx.clearRect(0, 0, width, height);

      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;
      c1.x = client.x;
      c1.y = client.y;

      if (Utils.circleCollision(c0, c1)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.beginPath();
      ctx.arc(c0.x, c0.y, c0.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(c1.x, c1.y, c1.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };

    canvas.addEventListener("pointermove", hPointerMove);

    return () => {
      canvas.removeEventListener("pointermove", hPointerMove);
    }
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default CircletoCircleCollision;
