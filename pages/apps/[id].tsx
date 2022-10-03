import type { NextPage } from "next";
import { useRouter } from "next/router";

import BakedLighting from "../../components/apps/BakedLighting";
import CharacterAnimation from "../../components/apps/CharacterAnimation";
import Product3D from "../../components/apps/Product3D";
import ParticleRegen from "../../components/apps/ParticleRegen";
import Spring from "../../components/apps/Spring";
import MultiGravity from "../../components/apps/MultiGravity";
import MultiCurve from "../../components/apps/MultiCurve";
import PerspectiveLetter from "../../components/apps/PerspectiveLetter";
import SpiralStar from "../../components/apps/SpiralStar";
import SpiralCircle from "../../components/apps/SpiralCircle";
import Steering from "../../components/apps/Steering";
import CubesHover from "../../components/apps/CubesHover";
import GradientBorderCard from "../../components/apps/GradientBorderCard";
import GradientBorderInput from "../../components/apps/GradientBorderInput";
import GradientCircleLoading from "../../components/apps/GradientCircleLoading";
import GlowHoverButton from "../../components/apps/GlowHoverButton";
import SoapBubble from "../../components/apps/SoapBubble";
import Loader from "../../components/apps/Loader";
import TextAnimation from "../../components/apps/TextAnimation";
import CircletoCircleCollision from "../../components/apps/CircletoCircleCollision";
import CircletoPointCollision from "../../components/apps/CircletoPointCollision";
import RecttoRectCollision from "../../components/apps/RecttoRectCollision";
import RecttoPointCollision from "../../components/apps/RecttoPointCollision";
import BabylonJS from "../../components/apps/BabylonJS";
import CodingMath from "../../components/apps/CodingMath";
// import Slider from "../../components/apps/Slider";
// import Redux from "../../components/apps/Redux";
// import AniRadialMenu from "../../components/apps/AniRadialMenu";

const AppDetail: NextPage = () => {
  const router = useRouter();
  const { component } = router.query;
  // const { id, category, name, component } = router.query;

  const appItem = () => {
    switch (component) {
      case "BakedLighting":
        return <BakedLighting />
      case "CharacterAnimation":
        return <CharacterAnimation />
      case "Product3D":
        return <Product3D />
      case "ParticleRegen":
        return <ParticleRegen />
      case "Spring":
        return <Spring />
      case "MultiGravity":
        return <MultiGravity />
      case "MultiCurve":
        return <MultiCurve />
      case "PerspectiveLetter":
        return <PerspectiveLetter />
      case "SpiralStar":
        return <SpiralStar />
      case "SpiralCircle":
        return <SpiralCircle />
      case "Steering":
        return <Steering />
      case "CubesHover":
        return <CubesHover />
      case "GradientBorderCard":
        return <GradientBorderCard />
      case "GradientBorderInput":
        return <GradientBorderInput />
      case "GradientCircleLoading":
        return <GradientCircleLoading />
      case "GlowHoverButton":
        return <GlowHoverButton />
      case "SoapBubble":
        return <SoapBubble />
      case "Loader":
        return <Loader />
      case "TextAnimation":
        return <TextAnimation />
      case "CircletoCircleCollision":
        return <CircletoCircleCollision />
      case "CircletoPointCollision":
        return <CircletoPointCollision />
      case "RecttoRectCollision":
        return <RecttoRectCollision />
      case "RecttoPointCollision":
        return <RecttoPointCollision />
      case "BabylonJS":
        return <BabylonJS />
      case "CodingMath":
        return <CodingMath />
      // case "Slider":
      //   return <Slider />
      // case "Redux":
      //   return <Redux />
      // case "AniRadialMenu":
      //   return <AniRadialMenu />
      default:
        break;
    }
  };

  return <>
    {appItem()}
  </>;
};

export default AppDetail;
