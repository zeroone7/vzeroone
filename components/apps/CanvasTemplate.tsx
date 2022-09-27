import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

import Utils from "../../components/lib/utils";

const CanvasTemplate: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    let hFrame = 0;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      hFrame = requestAnimationFrame(update);
    };
    update();

    const hMouseMove = (event: MouseEvent) => {
      const client = Utils.getClientPos(canvasRef.current, event, width, height)!;
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
export default CanvasTemplate;