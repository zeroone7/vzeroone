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

    const fl = 300;
    const cards: Array<{
      x: number;
      y: number;
      z: number;
      angle: number;
      radius: number;
    }> = [];
    const numCards = 200;
    const centerZ = 1000;

    let yPos = 0;
    let baseAngle = 0;
    let rotSpeed = 0.01;
    let hFrame = 0;

    for (let i = 0; i < numCards; i++) {
      const card = {
        x: 0,
        y: Utils.randomRange(2000, -2000),
        z: 0,
        angle: Utils.randomRange(0, Math.PI * 2),
        radius: Utils.randomRange(100, 1100),
      };

      card.x = Math.cos(card.angle + baseAngle) * card.radius;
      card.z = centerZ + Math.sin(card.angle + baseAngle) * card.radius;
      cards.push(card);
    }

    ctx.translate(width / 2, height / 2);

    const zsort = (
      cardA: { x: number; y: number; z: number; angle: number; radius: number },
      cardB: { x: number; y: number; z: number; angle: number; radius: number }
    ) => {
      return cardB.z - cardA.z;
    };

    const update = () => {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      baseAngle += rotSpeed;
      cards.sort(zsort);

      for (const card of cards) {
        const perspective = fl / (fl + card.z);

        ctx.save();
        ctx.scale(perspective, perspective);
        ctx.translate(card.x, card.y);
        ctx.globalAlpha = Utils.map(card.y, 2000, -2000, 1, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 40, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();

        card.x = Math.cos(card.angle + baseAngle) * card.radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * card.radius;
        card.y -= 10;

        if (card.y < -2000) {
          card.y = 2000;
        }
      }

      hFrame = requestAnimationFrame(update);
    };
    update();

    const hPointerMove = (event: PointerEvent) => {
      const client = Utils.getClientPos(
        canvasRef.current,
        event,
        width,
        height
      )!;

      rotSpeed = (client.x - width / 2) * 0.00005;
      yPos = (client.y - height / 2) * 2;
    };

    canvas.addEventListener("pointermove", hPointerMove);

    return () => {
      canvas.removeEventListener("pointermove", hPointerMove);
      cancelAnimationFrame(hFrame);
    };
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default CircletoCircleCollision;
