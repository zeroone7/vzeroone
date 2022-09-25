import styles from "../styles/Footer.module.css";

import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div className={styles.copyright}>CopyRight © 2020 - 2040 ZeroOne. All rights reserved.</div>
  );
};

export default Footer;
