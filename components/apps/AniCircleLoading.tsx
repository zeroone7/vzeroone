import styles from "../../styles/apps/AniCircleLoading.module.css";

import type { NextPage } from "next";

const AniCircleLoading: NextPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.loader}>
        <span style={{["--i" as any]: 1}}></span>
        <span style={{["--i" as any]: 2}}></span>
        <span style={{["--i" as any]: 3}}></span>
        <span style={{["--i" as any]: 4}}></span>
        <span style={{["--i" as any]: 5}}></span>
        <span style={{["--i" as any]: 6}}></span>
        <span style={{["--i" as any]: 7}}></span>
        <span style={{["--i" as any]: 8}}></span>
        <span style={{["--i" as any]: 9}}></span>
        <span style={{["--i" as any]: 10}}></span>
        <span style={{["--i" as any]: 11}}></span>
        <span style={{["--i" as any]: 12}}></span>
        <span style={{["--i" as any]: 13}}></span>
        <span style={{["--i" as any]: 14}}></span>
        <span style={{["--i" as any]: 15}}></span>
        <span style={{["--i" as any]: 16}}></span>
        <span style={{["--i" as any]: 17}}></span>
        <span style={{["--i" as any]: 18}}></span>
        <span style={{["--i" as any]: 19}}></span>
        <span style={{["--i" as any]: 20}}></span>
      </div>
    </section>
  );
};

export default AniCircleLoading;
