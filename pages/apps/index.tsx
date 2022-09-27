import styles from "../../styles/apps/Index.module.css";
import Header from "../../components/Header";

// import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";

type AppProp = {
  id: number;
  category: string;
  name: string;
  component: string;
};

const App: NextPage = () => {
  const router = useRouter();
  // const [selectApp, setSelectApp] = useState("");

  let appItem;

  const hClick = ({ id, category, name, component }: AppProp) => {
    router.push(
      {
        pathname: `/apps/${id}`,
        query: {
          id,
          category,
          name,
          component,
        },
      },
      `/apps/${id}`
    );
  };

  const apps = [
    { category: "3D", name: "BakedLighting", component: "BakedLighting" },
    { category: "3D", name: "Product3D", component: "Product3D" },
    { category: "canvas", name: "ParticleRegen", component: "ParticleRegen" },
    {
      category: "canvas",
      name: "CircletoCircleCollision",
      component: "CircletoCircleCollision",
    },
    {
      category: "canvas",
      name: "CircletoPointCollision",
      component: "CircletoPointCollision",
    },
    {
      category: "canvas",
      name: "RecttoRectCollision",
      component: "RecttoRectCollision",
    },
    {
      category: "canvas",
      name: "RecttoPointCollision",
      component: "RecttoPointCollision",
    },
    { category: "canvas", name: "Spring", component: "Spring" },
    {
      category: "canvas",
      name: "MultiGravity",
      component: "MultiGravity",
    },
    { category: "canvas", name: "MultiCurve", component: "MultiCurve" },
    {
      category: "canvas",
      name: "PerspectiveLetter",
      component: "PerspectiveLetter",
    },
    { category: "canvas", name: "SpiralStar", component: "SpiralStar" },
    { category: "canvas", name: "SpiralCircle", component: "SpiralCircle" },
    { category: "canvas", name: "Steering", component: "Steering" },
    { category: "css", name: "SoapBubble", component: "SoapBubble" },
    { category: "css", name: "Loader", component: "Loader" },
    {
      category: "css",
      name: "TextAnimation",
      component: "TextAnimation",
    },
    { category: "css", name: "GlowButton", component: "GlowButton" },
    { category: "3D", name: "BabylonJS", component: "BabylonJS" },
    { category: "canvas", name: "CodingMath", component: "CodingMath" },
    // { category: "css", name: "Slider", component: "Slider" },
    // { category: "script", name: "Redux", component: "Redux" },
  ];

  appItem = apps.map((app, id) => (
    <li key={id} onClick={() => hClick({ id, ...app })}>
      <span>{app.category}</span>
      <p>{app.name}</p>
    </li>
  ));

  // const hOnChange = (e: SelectChangeEvent) => {
  //   setSelectApp(e.target.value);
  // };

  // useEffect(() => {
  // const filteredApp = apps.filter((app) => {
  //   app.category === selectApp;
  // });
  // console.log(filteredApp);

  // appItem = filteredApp.map((app) => (
  //   <li key={app.id} onClick={() => hClick(app)}>
  //     <span>{app.category}</span>
  //     <p>{app.name}</p>
  //   </li>
  // ));
  // }, [selectApp]);

  return (
    <>
      <Header title="App | ZeroOne" />

      {/* <FormControl fullWidth>
        <InputLabel id="lbl-select">Age</InputLabel>
        <Select
          labelId="lbl-select"
          id="app-select"
          value={selectApp}
          label="App category"
          onChange={hOnChange}
        >
          <MenuItem value="css">CSS</MenuItem>
          <MenuItem value="canvas">Canvas</MenuItem>
          <MenuItem value="script">Script</MenuItem>
        </Select>
      </FormControl> */}

      <ul className={styles.app__item}>{appItem}</ul>
    </>
  );
};
export default App;

// export const getStaticProps = async () => {
//   const res = await fetch(`${process.env.APP_HOST}/api/apps`);
//   const apps = await res.json();

//   return {
//     props: {
//       apps,
//     },
//   };
// };
