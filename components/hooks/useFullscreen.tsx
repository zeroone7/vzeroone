import { useRef } from "react";

const useFullscreen = (onFullscreen: (isFullscreen: boolean) => void) => {
  const elementRef = useRef(null);

  const runFullscreen = () => {
    const ele = elementRef.current!;
    const element = (ele as HTMLElement);

    element.requestFullscreen();
    onFullscreen(true);
  };

  const runExit = () => {
    document.exitFullscreen();
    onFullscreen(false);
  };

  return { elementRef, runFullscreen, runExit };
};
export default useFullscreen;
