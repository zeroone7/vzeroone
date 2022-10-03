import styles from "../../styles/apps/GradientBorderCard.module.css";

import { useRef } from "react";
import type { NextPage } from "next";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const AniRadialMenu: NextPage = () => {
  const menuRef = useRef<HTMLUListElement>(null);

  const hClick = () => {
    menuRef.current?.classList.toggle("active");
  };

  return (
    <section className={styles.section}>
      <ul className={styles.menu} ref={menuRef}>
        <div className={styles.toggle} onClick={hClick}>
          <AddOutlinedIcon />
        </div>
        <li style={{ ["--i" as any]: 0, ["--clr" as any]: "#ff2972" }}>
          <a href="#">
            <HomeOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 1, ["--clr" as any]: "#fee800" }}>
          <a href="#">
            <PersonOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 2, ["--clr" as any]: "#04fc43" }}>
          <a href="#">
            <SettingsOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 3, ["--clr" as any]: "#fe00f1" }}>
          <a href="#">
            <EmailOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 4, ["--clr" as any]: "#90b0fe" }}>
          <a href="#">
            <KeyOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 5, ["--clr" as any]: "#fea600" }}>
          <a href="#">
            <VideoCameraFrontOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 6, ["--clr" as any]: "#a529ff" }}>
          <a href="#">
            <SportsEsportsOutlinedIcon />
          </a>
        </li>
        <li style={{ ["--i" as any]: 7, ["--clr" as any]: "#01bdab" }}>
          <a href="#">
            <CameraAltOutlinedIcon />
          </a>
        </li>
      </ul>
    </section>
  );
};
export default AniRadialMenu;
