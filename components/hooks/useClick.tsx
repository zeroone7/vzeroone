import { useEffect, useRef } from "react";

const useClick = (onClick: () => void) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ele = elementRef.current!;
    const element = (ele as HTMLElement);

    element.addEventListener("click", onClick);

    return () => {
      element.removeEventListener("click", onClick);
    }
  }, [onClick]);

  return elementRef;
};
export default useClick;
