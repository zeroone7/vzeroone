import styles from "../../styles/Canvas.module.css";

import { useEffect, useRef } from "react";
import type { NextPage } from "next";

import Utils from "../lib/utils";
import Draw from "../lib/draw";

const CircletoCircleCollision: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight * 0.92);

    const p0 = { x: 50, y: 300 };
    const p1 = { x: 150, y: 100 };
    const p2 = { x: 250, y: 300 };
    const p3 = { x: 350, y: 200 };
    const pA = { x: 0, y: 0 };
    const pB = { x: 0, y: 0 };
    const pC = { x: 0, y: 0 };
    const pM = { x: 0, y: 0 };
    const pN = { x: 0, y: 0 };
    const pFinal = { x: 0, y: 0 };

    let t = 0;
    let maxT = 0;
    let dir = 0.005;
    let isAnimate = false;
    let hFrame = 0;

    ctx.scale(1.5, 1.5);
    ctx.fillText("마우스를 눌러 보세요", width / 2, height / 2);

    Draw.arc(ctx, [p0, p1, p2, p3]);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      Draw.stroke(ctx, [p0, p1, p2, p3], "#ccc");
      Draw.arc(ctx, [p0, p1, p2, p3], 4, "#ccc");

      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      for (t = 0; t <= maxT; t += Math.abs(dir)) {
        pA.x = Utils.lerp(t, p0.x, p1.x);
        pA.y = Utils.lerp(t, p0.y, p1.y);

        pB.x = Utils.lerp(t, p1.x, p2.x);
        pB.y = Utils.lerp(t, p1.y, p2.y);

        pC.x = Utils.lerp(t, p2.x, p3.x);
        pC.y = Utils.lerp(t, p2.y, p3.y);

        pM.x = Utils.lerp(t, pA.x, pB.x);
        pM.y = Utils.lerp(t, pA.y, pB.y);

        pN.x = Utils.lerp(t, pB.x, pC.x);
        pN.y = Utils.lerp(t, pB.y, pC.y);

        pFinal.x = Utils.lerp(t, pM.x, pN.x);
        pFinal.y = Utils.lerp(t, pM.y, pN.y);

        ctx.lineTo(pFinal.x, pFinal.y);
      }
      ctx.stroke();

      Draw.stroke(ctx, [pA, pB, pC], "green");
      Draw.stroke(ctx, [pM, pN], "blue");
      Draw.arc(ctx, [pA, pB]);
      Draw.arc(ctx, [pA, pB, pC], 4, "green");
      Draw.arc(ctx, [pM, pN], 4, "blue");
      Draw.arc(ctx, [pFinal], 4, "red");

      ctx.fillStyle = "black";
      lblT();

      maxT += dir;
      if (maxT >= 1) {
        maxT = 1;
        dir *= -1;
      }
      if (maxT <= 0) {
        maxT = 0;
        dir *= -1;
      }

      if (isAnimate) {
        hFrame = requestAnimationFrame(update);
      }
    };

    const lblT = () => {
      ctx.fillText("t = " + Utils.roundToPlaces(maxT, 2), 200, 50);
    };

    const hClick = () => {
      isAnimate = true;
      update();
    };

    canvas.addEventListener("click", hClick);

    return () => {
      canvas.removeEventListener("click", hClick);
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
