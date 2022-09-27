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

    const circle = {
      x: width / 2,
      y: height / 2,
      radius: 50 + Math.random() * 100,
    };

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fill();

    const hMouseMove = (event: MouseEvent) => {
      ctx.clearRect(0, 0, width, height);

      const client = Utils.getClientPos(
        canvasRef.current,
        event,
        width,
        height
      )!;

      if (Utils.circlePointCollision(client.x, client.y, circle)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
      ctx.fill();
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
