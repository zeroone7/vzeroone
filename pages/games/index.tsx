import styles from "../../styles/games/Index.module.css";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import Header from "../../components/Header";

type GameProps = {
  id: number;
  category: string;
  name: string;
  component: string;
};

type GamesProps = {
  games: Array<GameProps>;
};

const Game: NextPage<GamesProps> = () => {
  const router = useRouter();

  const games = [
    { id: 1, category: "puzzle", name: "Tetris", component: "Tetris" },
    // { id: 2, category: "puzzle", name: "Puzzle", component: "Puzzle" },
  ];

  const appItem = games.map((game) => (
    <li key={game.id} onClick={() => hClick(game)}>
      <span>{game.category}</span>
      <p>{game.name}</p>
    </li>
  ));

  const hClick = ({ id, category, name, component }: GameProps) => {
    router.push(
      {
        pathname: `/games/${id}`,
        query: {
          id,
          category,
          name,
          component,
        },
      },
      `/games/${id}`
    );
  };

  return (
    <>
      <Header title="Game | ZeroOne" />
      <ul className={styles.game__item}>{appItem}</ul>
    </>
  );
};
export default Game;

// export const getStaticProps = async () => {
//   const res = await fetch(`${process.env.APP_HOST}/api/games`);
//   const games = await res.json();

//   return {
//     props: {
//       games,
//     },
//   };
// };
