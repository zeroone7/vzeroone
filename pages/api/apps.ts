import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number,
  category: string,
  name: string,
  component: string,
};

const apps = [
  { id: 1, category: "css", name: "SoapBubble", component: "SoapBubble" },
  { id: 2, category: "css", name: "Slider", component: "Slider" },
  { id: 3, category: "css", name: "Loader", component: "Loader" },
  { id: 4, category: "script", name: "Redux", component: "Redux" },
  { id: 5, category: "css", name: "TextAnimation", component: "TextAnimation" },
  { id: 6, category: "css", name: "GlowButton", component: "GlowButton" },
  { id: 7, category: "canvas", name: "CodingMath", component: "CodingMath" },
  { id: 8, category: "canvas", name: "Ship", component: "Ship" },
  { id: 9, category: "css", name: "app 9", component: "SoapBubble" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Data>>
) {
  res.status(200).json(apps);
}
