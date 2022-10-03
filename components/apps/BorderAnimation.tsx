import styles from "../../styles/apps/BorderAnimation.module.css";

import type { NextPage } from "next";

const BorderAnimation: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <span></span>
        <h2>07</h2>
      </div>
    </section>
  );
};

export default BorderAnimation;
