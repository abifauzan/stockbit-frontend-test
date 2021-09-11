import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleResize = () => {
    const currentSize = window.innerWidth < 768;
    if (currentSize !== isMobile) {
      setIsMobile(currentSize);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return isMobile;
}