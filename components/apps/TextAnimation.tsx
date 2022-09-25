import styles from "../../styles/apps/TextAnimation.module.css";

import type { NextPage } from "next";

const TextAnimation: NextPage = () => {
  return (
    <section className={styles.section}>
      <h2 data-text="️&nbsp;▶ CSS Only ◀&nbsp;">&nbsp;▶ CSS Only ◀&nbsp;</h2>
    </section>
  );
};

export default TextAnimation;
