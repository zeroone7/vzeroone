import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number,
  category: string,
  name: string,
  component: string,
};

const apps = [
  { id: 1, category: "puzzle", name: "테트리스", component: "Tetris" },
  { id: 2, category: "puzzle", name: "app 2", component: "Bubble" },
  { id: 3, category: "puzzle", name: "app 3", component: "Bubble" },
  { id: 4, category: "puzzle", name: "app 4", component: "Bubble" },
  { id: 5, category: "puzzle", name: "app 5", component: "Bubble" },
  { id: 6, category: "puzzle", name: "app 6", component: "Bubble" },
  { id: 7, category: "puzzle", name: "app 7", component: "Bubble" },
  { id: 8, category: "puzzle", name: "app 8", component: "Bubble" },
  { id: 9, category: "puzzle", name: "app 9", component: "Bubble" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Data>>
) {
  res.status(200).json(apps);
}
