import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

import { BabylonDoc } from "../babylonjs/BabylonDoc";

const BabylonJS: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.92;

    new BabylonDoc(canvas);
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default BabylonJS;