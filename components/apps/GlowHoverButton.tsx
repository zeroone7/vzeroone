import styles from "../../styles/apps/GlowHoverButton.module.css";

import type { NextPage } from "next";

const GlowHoverButton: NextPage = () => {
  return (
    <section className={styles.section}>
      <a href="#" style={{["--clr" as any]: "dodgerblue"}}><span>Button</span><i></i></a>
      <a href="#" style={{["--clr" as any]: "crimson"}}><span>Button</span><i></i></a>
      <a href="#" style={{["--clr" as any]: "limegreen"}}><span>Button</span><i></i></a>
    </section>
  );
};

export default GlowHoverButton;
