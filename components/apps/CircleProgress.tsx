import styles from "../../styles/apps/CircleProgress.module.css";

import type { NextPage } from "next";

const CircleProgress: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.percent} style={{["--clr" as any]: "limegreen", ["--num" as any]: 95}}>
          <div className={styles.dot}></div>
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className={styles.number}>
            <h2>95<span>%</span></h2>
            <p>Tyepscript</p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.percent} style={{["--clr" as any]: "gold", ["--num" as any]: 90}}>
          <div className={styles.dot}></div>
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className={styles.number}>
            <h2>90<span>%</span></h2>
            <p>Nextjs</p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.percent} style={{["--clr" as any]: "hotpink", ["--num" as any]: 70}}>
          <div className={styles.dot}></div>
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className={styles.number}>
            <h2>70<span>%</span></h2>
            <p>canvas</p>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.percent} style={{["--clr" as any]: "dodgerblue", ["--num" as any]: 80}}>
          <div className={styles.dot}></div>
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70"></circle>
          </svg>
          <div className={styles.number}>
            <h2>80<span>%</span></h2>
            <p>css</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircleProgress;
