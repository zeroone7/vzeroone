import { useState } from "react";

const useTabs = (initTab: number, allTabs: Array<{tab: string, content: string}>) => {
  const [currentIndex, setCurrentIndex] = useState(initTab);

  return { currentItem: allTabs[currentIndex], changeItem: setCurrentIndex };
};
export default useTabs;
