import styles from "../../styles/apps/WavyText.module.css";

import type { NextPage } from "next";

const AniBlob: NextPage = () => {
  return (
    <section className={styles.section}>
      <svg>
        <filter id="wavy">
          <feTurbulence type="turbulence" baseFrequency="0.005" numOctaves="5" />
          <feDisplacementMap in="SourceGraphic" scale="50" />
        </filter>
      </svg>
      <h2>Wavy</h2>
    </section>
  );
};

export default AniBlob;
