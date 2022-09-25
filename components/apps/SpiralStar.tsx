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
      z: number;
      angle: number;
      img: CanvasImageSource;
    }> = [];
    const numCards = 20;
    const centerZ = 1000;

    let yPos = 0;
    let radius = 1000;
    let baseAngle = 0;
    let rotSpeed = 0.01;
    let hFrame = 0;

    for (let i = 0; i < numCards; i++) {
      const card = {
        x: 0,
        z: 0,
        angle: ((Math.PI * 2) / numCards) * i,
        img: new Image(),
      };

      card.x = Math.cos(card.angle + baseAngle) * radius;
      card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      card.img.src = "/star.png";

      card.img.onload = function () {
        cards.push(card);
      };
    }

    ctx.translate(width / 2, height / 2);
    ctx.font = "200px Arial";

    const zsort = (
      cardA: { x: number; z: number; angle: number; img: CanvasImageSource },
      cardB: { x: number; z: number; angle: number; img: CanvasImageSource }
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
        ctx.translate(card.x, yPos);

        ctx.translate(-card.img.width / 2, -card.img.height / 2);
        ctx.drawImage(card.img, 0, 0);
        ctx.restore();

        card.x = Math.cos(card.angle + baseAngle) * radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
      }

      hFrame = requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getMousePos(
        canvasRef.current,
        event,
        width,
        height
      )!;

      rotSpeed = (client.x - width / 2) * 0.00005;
      yPos = (client.y - height / 2) * 2;
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
