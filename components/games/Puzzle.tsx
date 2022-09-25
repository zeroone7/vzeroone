import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

const Puzzle: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    let posX = 0;
    let hFrame = 0;
    let startTime = Date.now();

    const update = () => {
      let currentTime = Date.now();
      let deltaTime = currentTime - startTime;
      startTime = currentTime;
      console.log(deltaTime);

      console.log("Update Call");

      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(posX, height / 2);
      ctx.stroke();

      posX += 1;

      hFrame = requestAnimationFrame(update);
    };
    update();

    const hMouseMove = () => {
      console.log("Handle Mouse Move");
    };

    canvas.addEventListener("mousemove", hMouseMove);

    return () => {
      console.log("Clean Up");
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
export default Puzzle;
