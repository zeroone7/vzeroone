import styles from "../../styles/apps/GradientBorderCard.module.css";

import type { NextPage } from "next";

const GradientBorderCard: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <span></span>
        <div className={styles.content}>
          <h2>Card One</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex aliquid
            esse vero aperiam quasi minima dignissimos. Blanditiis corrupti
            similique quae delectus, ea eos natus accusantium quis magni,
            officia, mollitia perspiciatis.
          </p>
          <a href="#">Read More</a>
        </div>
      </div>

      <div className={styles.card}>
        <span></span>
        <div className={styles.content}>
          <h2>Card Two</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex aliquid
            esse vero aperiam quasi minima dignissimos. Blanditiis corrupti
            similique quae delectus, ea eos natus accusantium quis magni,
            officia, mollitia perspiciatis.
          </p>
          <a href="#">Read More</a>
        </div>
      </div>

      <div className={styles.card}>
        <span></span>
        <div className={styles.content}>
          <h2>Card Three</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex aliquid
            esse vero aperiam quasi minima dignissimos. Blanditiis corrupti
            similique quae delectus, ea eos natus accusantium quis magni,
            officia, mollitia perspiciatis.
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </section>
  );
};
export default GradientBorderCard;
