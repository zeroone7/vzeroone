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

    const rect = { x: width / 2, y: height / 2, width: -200, height: -100 };

    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

    const hMouseMove = (event: MouseEvent) => {
      ctx.clearRect(0, 0, width, height);

      const pos = Utils.getMousePos(canvasRef.current, event, width, height)!;

      if (Utils.pointInRect(pos.x, pos.y, rect)) {
        ctx.fillStyle = "#f66";
      } else {
        ctx.fillStyle = "#999";
      }

      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
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
