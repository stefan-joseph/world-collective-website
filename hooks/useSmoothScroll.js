import { useEffect, useState } from "react";

export default function useSmoothScroll({ ref }) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array (like Chrome)
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          document.body.style.height = `${contentBoxSize.blockSize}px`;
        } else {
          // for safari, etc.
          document.body.style.height = `${entry.contentRect.height}px`;
        }
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  const data = {
    ease: 0.9,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = () => {
    // Stop recursive call if element removed from DOM or is exiting through router transition

    if (
      ref.current &&
      !ref.current.parentElement.className.includes("openPage-exit")
    ) {
      data.current = window.scrollY;
      data.previous += (data.current - data.previous) * data.ease;
      data.rounded = Math.round(data.previous * 100) / 100;

      ref.current.style.transform = `translate3d(0, -${data.rounded}px, 0)`;

      // Recursive call
      requestAnimationFrame(() => smoothScrollingHandler());
    }
  };
}
