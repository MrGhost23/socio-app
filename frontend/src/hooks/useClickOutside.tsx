import { useEffect, useRef } from "react";

const useClickOutside = (callbackFun: () => void) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const callBackFunRef = useRef<(() => void) | null>(null);
  callBackFunRef.current = callbackFun;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node) &&
        callBackFunRef.current
      ) {
        callBackFunRef.current();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return elementRef;
};

export default useClickOutside;
