import { useEffect, useRef } from "react";

const useFadeIn = (duration: number = 1, delay: number = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ele = elementRef.current!;
    const element = (ele as HTMLElement);

    if (element) {
      element.style.opacity = "1";
      element.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
    }
  }, [duration, delay]);

  return { ref: elementRef, style: { opacity: 0 } };
};
export default useFadeIn;
