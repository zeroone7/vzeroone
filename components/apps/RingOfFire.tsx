import styles from "../../styles/apps/RingOfFire.module.css";

import type { NextPage } from "next";

const RingOfFire: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <svg>
        <filter id="wavy">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.009"
            numOctaves="5"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              dur="60s"
              values="0.02; 0.005; 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>
    </section>
  );
};

export default RingOfFire;
