import styles from "../../styles/apps/GradientCircleLoading.module.css";

import { useRef, useEffect } from "react";
import type { NextPage } from "next";

const GradientCircleLoading: NextPage = () => {
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = pRef.current!;
    text.innerHTML = text.innerText
      .split("")
      .map(
        (char, idx) => `<b style="transform:rotate(${idx * 5.5}deg)">${char}</b>`
      )
      .join("");
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.loader}>
        <div className={styles.text}>
          <p ref={pRef}>Gradient Loading Animation Effects -</p>
        </div>
        <span>
          <i></i>
        </span>
      </div>
    </section>
  );
};

export default GradientCircleLoading;
