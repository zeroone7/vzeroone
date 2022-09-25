import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

import Utils from "../lib/utils";
import Particle from "../lib/particle";

const CircletoCircleCollision: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    const sun1 = new Particle(300, 200, 0, 0);
    const sun2 = new Particle(800, 500, 0, 0);
    const emitter = { x: 100, y: 0 };
    const particles: Array<Particle> = [];
    const numParticles = 100;

    let hFrame = 0;

    sun1.mass = 10000;
    sun1.radius = 10;
    sun2.mass = 20000;
    sun2.radius = 20;

    for (let i = 0; i < numParticles; i++) {
      const p = new Particle(
        emitter.x,
        emitter.y,
        Utils.randomRange(7, 8),
        Math.PI / 2 + Utils.randomRange(-0.1, 0.1)
      );

      p.addGravitation(sun1);
      p.addGravitation(sun2);
      p.radius = 3;
      particles.push(p);
    }

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      sun1.draw(ctx, sun1.radius, "yellow");
      sun2.draw(ctx, sun2.radius, "yellow");

      for (const p of particles) {
        p.update();
        p.draw(ctx, p.radius);

        if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
          p.x = emitter.x;
          p.y = emitter.y;
          p.speed = Utils.randomRange(7, 8);
          p.angle = Math.PI / 2 + Utils.randomRange(-0.1, 0.1);
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
