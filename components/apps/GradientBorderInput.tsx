import styles from "../../styles/apps/GradientBorderInput.module.css";

import type { NextPage } from "next";

const GradientBorderInput: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.formInput}>
        <input type="text" required />
        <span>First Name</span>
        <i></i>
      </div>

      <div className={styles.formInput}>
        <input type="text" required />
        <span>Last Name</span>
        <i></i>
      </div>
    </section>
  );
};

export default GradientBorderInput;
