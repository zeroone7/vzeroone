import { useEffect } from "react";

const useBeforeLeave = (onBefore: () => void) => {
  useEffect(() => {
    document.addEventListener("mouseleave", onBefore);

    return () => {
      document.removeEventListener("mouseleave", onBefore);
    };
  }, [onBefore]);
};
export default useBeforeLeave;
