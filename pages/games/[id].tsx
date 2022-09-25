import type { NextPage } from "next";
import { useRouter } from "next/router";

import Tetris from "../../components/games/Tetris";
import Puzzle from "../../components/games/Puzzle";

const GameDetail: NextPage = () => {
  const router = useRouter();
  const { id, category, name, component } = router.query;

  const gameComponent = () => {
    switch (component) {
      case "Tetris":
        return <Tetris />
      case "Puzzle":
        return <Puzzle />
      default:
        break;
    }
  };

  return <>
    {gameComponent()}
  </>;
};

export default GameDetail;
