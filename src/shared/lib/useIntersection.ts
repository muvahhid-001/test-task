import { useEffect } from "react";
import type { RefObject } from "react";

export const useIntersection = (
  ref: RefObject<Element | null>,
  onIntersect: () => void,
  canLoad: boolean
) => {
  useEffect(() => {
    if (!ref.current || !canLoad) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current, onIntersect, canLoad]);
};
