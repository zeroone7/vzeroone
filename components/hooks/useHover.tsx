import { useEffect, useRef } from "react";

const useHover = (onHover: () => void) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ele = elementRef.current!;
    const element = (ele as HTMLElement);

    element.addEventListener("mouseenter", onHover);

    return () => {
      element.removeEventListener("mouseenter", onHover);
    }
  }, [onHover]);

  return elementRef;
};
export default useHover;

