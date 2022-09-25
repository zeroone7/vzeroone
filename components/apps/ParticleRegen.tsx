import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

import Particle from "../lib/particle";

const ParticleRegen: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    const particles: Array<Particle> = [];

    let hFrame = 0;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      if (particles.length < 100) {
        const p = new Particle(
          width / 2,
          height,
          Math.random() * 8 + 5,
          -Math.PI / 2 + (Math.random() * 0.2 - 0.1),
          0.1
        );
        p.radius = Math.random() * 10 + 2;
        particles.push(p);
      }

      for (const p of particles) {
        p.update();
        p.draw(ctx, p.radius);

        if (p.y - p.radius > height) {
          p.x = width / 2;
          p.y = height;
          p.speed = Math.random() * 8 + 5;
          p.angle = -Math.PI / 2 + (Math.random() * 0.2 - 0.1);
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
export default ParticleRegen;