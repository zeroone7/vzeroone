import type { NextPage } from "next";
import { useRouter } from "next/router";

import BabylonJS from "../../components/apps/BabylonJS";
import CharacterAnimation from "../../components/apps/CharacterAnimation";
import BakedLighting from "../../components/apps/BakedLighting";
import Product3D from "../../components/apps/Product3D";
import SoapBubble from "../../components/apps/SoapBubble";
// import Slider from "../../components/apps/Slider";
import Loader from "../../components/apps/Loader";
// import Redux from "../../components/apps/Redux";
import TextAnimation from "../../components/apps/TextAnimation";
import GlowButton from "../../components/apps/GlowButton";
import CodingMath from "../../components/apps/CodingMath";
import ParticleRegen from "../../components/apps/ParticleRegen";
import CircletoCircleCollision from "../../components/apps/CircletoCircleCollision";
import CircletoPointCollision from "../../components/apps/CircletoPointCollision";
import RecttoRectCollision from "../../components/apps/RecttoRectCollision";
import RecttoPointCollision from "../../components/apps/RecttoPointCollision";
import Spring from "../../components/apps/Spring";
import MultiGravity from "../../components/apps/MultiGravity";
import MultiCurve from "../../components/apps/MultiCurve";
import PerspectiveLetter from "../../components/apps/PerspectiveLetter";
import SpiralStar from "../../components/apps/SpiralStar";
import SpiralCircle from "../../components/apps/SpiralCircle";
import Steering from "../../components/apps/Steering";

const AppDetail: NextPage = () => {
  const router = useRouter();
  const { component } = router.query;
  // const { id, category, name, component } = router.query;

  const appItem = () => {
    switch (component) {
      case "BabylonJS":
        return <BabylonJS />
      case "CodingMath":
        return <CodingMath />
      case "BakedLighting":
        return <BakedLighting />
      case "CharacterAnimation":
        return <CharacterAnimation />
      case "Product3D":
        return <Product3D />
      case "ParticleRegen":
        return <ParticleRegen />
      case "CircletoCircleCollision":
        return <CircletoCircleCollision />
      case "CircletoPointCollision":
        return <CircletoPointCollision />
      case "RecttoRectCollision":
        return <RecttoRectCollision />
      case "RecttoPointCollision":
        return <RecttoPointCollision />
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
      case "SoapBubble":
        return <SoapBubble />
      // case "Slider":
      //   return <Slider />
      case "Loader":
        return <Loader />
      // case "Redux":
      //   return <Redux />
      case "TextAnimation":
        return <TextAnimation />
      case "GlowButton":
        return <GlowButton />
      default:
        break;
    }
  };

  return <>
    {appItem()}
  </>;
};

export default AppDetail;
