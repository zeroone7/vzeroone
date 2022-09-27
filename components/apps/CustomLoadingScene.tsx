import styles from "../../styles/CustomLoadingScene.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

import { CustomLoading } from "../babylonjs/loading/CustomLoading";

const CustomLoadingScene: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.92;

    // new CustomLoading(canvas);
  }, []);

  return (
    <section className={styles.section}>
      <div id="loader">
        <p>Loading</p>

        <div id="loadingContainer">
          <div id="loadingBar"></div>
        </div>

        <p id="percentLoaded">25%</p>
      </div>

      <p>Custom Loading Screen</p>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default CustomLoadingScene;