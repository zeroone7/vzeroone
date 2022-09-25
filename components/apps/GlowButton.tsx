import styles from "../../styles/apps/GlowButton.module.css";

import type { NextPage } from "next";

const GlowButton: NextPage = () => {
  return (
    <section className={styles.section}>
      <a href="#" style={{["--clr" as any]: "#1e9bff"}}><span>Button</span><i></i></a>
      <a href="#" style={{["--clr" as any]: "#ff1867"}}><span>Button</span><i></i></a>
      <a href="#" style={{["--clr" as any]: "#6eff3e"}}><span>Button</span><i></i></a>
    </section>
  );
};

export default GlowButton;
