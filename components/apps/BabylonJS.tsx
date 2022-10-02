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
// import { CameraMechanics } from "../babylonjs/CameraMechanics";
// import { MeshActions } from "../babylonjs/MeshActions";
// import { FirstPersonCtrl } from "../babylonjs/FirstPersonCtrl";
// import { PhysicsImposters } from "../babylonjs/PhysicsImposters";
// import { CollisionTriggers } from "../babylonjs/CollisionTriggers";
// import { PhysicsVelocity } from "../babylonjs/PhysicsVelocity";
// import { PhysicsForces } from "../babylonjs/PhysicsForces";
// import { Raycasting } from "../babylonjs/Raycasting";
// import { Animations } from "../babylonjs/Animations";
// import { CharacterAnimations } from "../babylonjs/CharacterAnimations";
// import { CutScene } from "../babylonjs/CutScene";
// import { AniEvent } from "../babylonjs/AniEvent";
import { AniBlending } from "../babylonjs/AniBlending";
// import { AudioExample } from "../babylonjs/AudioExample";

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
    // new CameraMechanics(canvas);
    // new MeshActions(canvas);
    // new FirstPersonCtrl(canvas);
    // new PhysicsImposters(canvas);
    // new CollisionTriggers(canvas);
    // new PhysicsVelocity(canvas);
    // new PhysicsForces(canvas);
    // new Raycasting(canvas);
    // new Animations(canvas);
    // new CutScene(canvas);
    // new AniEvent(canvas);
    new AniBlending(canvas);
    // new AudioExample(canvas);
  }, []);

  return (
    <section className={styles.section}>
      <canvas ref={canvasRef} tabIndex={0}></canvas>
    </section>
  );
};
export default BabylonJS;