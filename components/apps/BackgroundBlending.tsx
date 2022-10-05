import styles from "../../styles/apps/BackgroundBlending.module.css";

import { useState } from "react";
import type { NextPage } from "next";

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const BackgroundBlending: NextPage = () => {
  const [blendMode, setBlendMode] = useState("overlay");

  const hChange = (event: SelectChangeEvent) => {
    setBlendMode(event.target.value as string);
  };

  return (
    <section
      className={styles.section}
      style={{ backgroundBlendMode: blendMode }}
    >
      <FormControl fullWidth>
        <InputLabel id="selMode">Blend Mode</InputLabel>
        <Select
          labelId="selMode"
          value={blendMode}
          label="Blend Mode"
          onChange={hChange}
          style={{ borderColor: "black", color: "black" }}
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="multiply">Multiply</MenuItem>
          <MenuItem value="screen">Screen</MenuItem>
          <MenuItem value="overlay">Overlay</MenuItem>
          <MenuItem value="darken">Darken</MenuItem>
          <MenuItem value="lighten">Lighten</MenuItem>
          <MenuItem value="color-dodge">ColorDodge</MenuItem>
          <MenuItem value="color-burn">ColorBurn</MenuItem>
          <MenuItem value="hard-light">HardLight</MenuItem>
          <MenuItem value="soft-light">SoftLight</MenuItem>
          <MenuItem value="difference">Difference</MenuItem>
          <MenuItem value="exclusion">Exclusion</MenuItem>
          <MenuItem value="hue">Hue</MenuItem>
          <MenuItem value="saturation">Saturation</MenuItem>
          <MenuItem value="color">Color</MenuItem>
          <MenuItem value="luminosity">Luminosity</MenuItem>
        </Select>
      </FormControl>

      <div className={styles.content}>
        <h2>Wave Shape Banner</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          quisquam exercitationem mollitia fugit! Commodi tempore cumque esse
          tenetur explicabo, provident beatae dicta veniam error ullam culpa
          officia debitis illum ad?
        </p>
      </div>
    </section>
  );
};

export default BackgroundBlending;
