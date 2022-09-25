import { useState, useEffect } from "react";

const useNetwork = (onChange: (isOnline: boolean) => void) => {
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    const hChange = () => {
      onChange(navigator.onLine);
      setStatus(navigator.onLine);
    };

    document.addEventListener("online", hChange);
    document.addEventListener("offline", hChange);

    return () => {
      document.removeEventListener("online", hChange);
      document.removeEventListener("offline", hChange);
    };
  }, [onChange]);

  return status;
};
export default useNetwork;
