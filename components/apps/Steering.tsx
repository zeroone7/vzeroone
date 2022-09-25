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

    let angle = 0;
    let tAngle = 0;
    let ease = 0.05;
    let wheel = new Image();
    let hFrame = 0;

    wheel.src = "/wheel.png";
    wheel.onload = function () {
      update();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      angle += (tAngle - angle) * ease;

      ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(angle);

        ctx.drawImage(wheel, -wheel.width / 2, -wheel.height / 2);
      ctx.restore();

      hFrame = requestAnimationFrame(update);
    };

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getMousePos(canvasRef.current, event, width, height)!;

      tAngle = Utils.map(client.x, 0, width, -Math.PI, Math.PI);
    };

    canvas.addEventListener("mousemove", hMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", hMouseMove);
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