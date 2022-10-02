import styles from "../../styles/apps/CubesHover.module.css";

import type { NextPage } from "next";

const CubesHover: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.cube}>
        <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
        <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
        <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
      </div>
      <div className={styles.cube}>
        <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
        <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
        <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
      </div>
      <div className={styles.cube}>
        <div style={{ ["--x" as any]: -1, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
        <div style={{ ["--x" as any]: 0, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
        <div style={{ ["--x" as any]: 1, ["--y" as any]: 0 }}>
          <span style={{ ["--i" as any]: 3 }}></span>
          <span style={{ ["--i" as any]: 2 }}></span>
          <span style={{ ["--i" as any]: 1 }}></span>
        </div>
      </div>
    </section>
  );
};
export default CubesHover;
