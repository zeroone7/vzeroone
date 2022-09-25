import styles from "../styles/Nav.module.css";

import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import HomeIcon from "@mui/icons-material/Home";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import DataArrayIcon from "@mui/icons-material/DataArray";
import AppsIcon from "@mui/icons-material/Apps";

type NavProps = {
  colorMode: { toggleColorMode: () => void };
};

const Nav: NextPage<NavProps> = ({ colorMode }) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [collapse, setCollapse] = useState("collapsed");

  const setCollapsed = () => {
    collapse === "" ? setCollapse(collapse => collapse = "collapsed") : setCollapse(collapse => collapse = "");
  };

  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>ZeroOne</span>
      <ul className={collapse === "collapsed" ? styles.collapsed : ""}>
        <li>
          <Link href="/">
            <Button
              variant="text"
              startIcon={<HomeIcon />}
              onClick={setCollapsed}
            >
              Home
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/apps">
            <Button
              variant="text"
              startIcon={<TabletMacIcon />}
              onClick={setCollapsed}
            >
              Apps
            </Button>
          </Link>
        </li>
        {/* <li>
          <Link href="/games">
            <Button
              variant="text"
              startIcon={<VideogameAssetIcon />}
              onClick={setCollapsed}
            >
              Games
            </Button>
          </Link>
        </li> */}
        <li>
          <Link href="/pubdata">
            <Button
              variant="text"
              startIcon={<DataArrayIcon />}
              onClick={setCollapsed}
            >
              PubData
            </Button>
          </Link>
        </li>
        <li>
          <FormControlLabel
            label={`${theme.palette.mode.toUpperCase()} Theme`}
            control={
              <Switch
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  colorMode.toggleColorMode();
                }}
              />
            }
          />
        </li>
      </ul>
      <span className={styles.apps__icon} onClick={setCollapsed}>
        <AppsIcon />
      </span>
    </nav>
  );
};

export default Nav;
