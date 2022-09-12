import { useEffect, useMemo, useState } from "react";

export default function useIsInViewport(ref, threshold) {
  const [isInViewPort, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      {
        threshold: threshold || null,
      }
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isInViewPort;
}
