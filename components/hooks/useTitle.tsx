import { useState, useEffect } from "react";

const useTitle = (initTitle: string) => {
  const [title, setTitle] = useState(initTitle);

  useEffect(() => {
    const eleTitle = document.querySelector("title");
    if (!eleTitle) return;

    eleTitle.innerText = title;
  }, [title]);

  return setTitle;
};
export default useTitle;
