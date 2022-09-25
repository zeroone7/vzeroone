import styles from "../styles/Layout.module.css";

import React from "react";
import type { NextPage } from "next";

import Nav from "./Nav";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  colorMode: { toggleColorMode: () => void };
};

const Layout: NextPage<LayoutProps> = ({ children, colorMode }) => {
  return (
    <div className={styles.container}>
      <header><Nav colorMode={colorMode} /></header>
      <main>{children}</main>
      <footer><Footer /></footer>
    </div>
  );
};

export default Layout;
