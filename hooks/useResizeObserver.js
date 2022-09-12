import { useEffect } from "react";

export default function useResizeObserver(ref, handler) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      handler(entries);
    });
    observer.observe(ref.current);
  }, [ref]);
}
