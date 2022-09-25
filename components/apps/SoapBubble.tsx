import styles from "../../styles/apps/SoapBubble.module.css";

import type { NextPage } from "next";

const Bubble: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.bubble}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.bubble}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.bubble}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.bubble}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.bubble}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default Bubble;
