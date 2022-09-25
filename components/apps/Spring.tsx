import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

import Utils from "../lib/utils";
import Particle from "../lib/particle";

const CircletoCircleCollision: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    const pSpring1 = {
      point: { x: width / 2, y: height / 2 },
      length: 100,
      k: 0.1,
    };
    const pSpring2 = {
      point: {
        x: Utils.randomRange(0, width),
        y: Utils.randomRange(0, height),
      },
      length: 100,
      k: 0.1,
    };
    const weight = new Particle(
      Math.random() * width,
      Math.random() * height,
      50,
      Math.random() * Math.PI * 2,
      0.5
    );

    let hFrame = 0;

    weight.radius = 20;
    weight.friction = 0.95;
    weight.addSpring(pSpring1);
    weight.addSpring(pSpring2);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      weight.update();
      weight.draw(ctx, weight.radius);

      ctx.beginPath();
      ctx.arc(pSpring1.point.x, pSpring1.point.y, 4, 0, Math.PI * 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pSpring2.point.x, pSpring2.point.y);
      ctx.lineTo(weight.x, weight.y);
      ctx.lineTo(pSpring1.point.x, pSpring1.point.y);
      ctx.stroke();

      hFrame = requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getMousePos(canvasRef.current, event, width, height)!;

      pSpring1.point.x = client.x;
      pSpring1.point.y = client.y;
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