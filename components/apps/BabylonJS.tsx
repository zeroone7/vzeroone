import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next"

// import { BasicScene } from "../babylonjs/BasicScene";
// import { StdMaterials } from "../babylonjs/StdMaterials";
// import { PBR } from "../babylonjs/PBR";
// import { CustomModels } from "../babylonjs/CustomModels";
// import { LightShadows } from "../babylonjs/LightShadows";
// import { BakedLighting } from "../babylonjs/BakedLighting";
// import { CustomLoading } from "../babylonjs/CustomLoading";
import { CameraMechanics } from "../babylonjs/CameraMechanics";

const BabylonJS: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.92;

    // new BasicScene(canvas);
    // new StdMaterials(canvas);
    // new PBR(canvas);
    // new CustomModels(canvas);
    // new LightShadows(canvas);
    // new BakedLighting(canvas);
    // new CustomLoading(canvas);
    new CameraMechanics(canvas);
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default BabylonJS;