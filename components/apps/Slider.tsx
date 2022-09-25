import styles from "../../styles/apps/Slider.module.css";

import { useState } from "react";
import type { NextPage } from "next";

const Bubble: NextPage = () => {
  const [value, setValue] = useState("50");

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <input
          type="range"
          className={styles.range}
          min="0"
          max="100"
          value={value}
          onInput={(e) => setValue(e.currentTarget.value)}
        />
        <span className={styles.rangeValue}>{value}</span>
      </div>
    </section>
  );
};

export default Bubble;
