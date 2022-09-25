import styles from "../../styles/apps/Loader.module.css";

import type { NextPage } from "next";

const Loader: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.loader}></div>
    </section>
  );
};

export default Loader;
