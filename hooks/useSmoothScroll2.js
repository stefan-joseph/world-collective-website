import { useEffect, useState, useRef } from "react";

export default function useSmoothScroll({ ref, speed, menuIsClosed }) {
  const menuIsClosedRef = useRef(menuIsClosed);
  const [scrollPosition, setScrollPosition] = useState(100);

  useEffect(() => {
    console.log(menuIsClosed);
    menuIsClosedRef.current = menuIsClosed;
    console.log(menuIsClosedRef);
  }, [menuIsClosed]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(
      ([entry]) =>
        (document.body.style.height = `${entry.borderBoxSize[0].blockSize}px`)
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    if (!menuIsClosed) return;
    requestAnimationFrame(() => smoothScrollingHandler());
  }, [menuIsClosed]);

  const smoothScrollingHandler = () => {
    // Stop recursive call if element removed from DOM or is exiting through router transition

    if (
      ref.current &&
      !ref.current.parentElement.className.includes("openPage-exit") &&
      menuIsClosedRef.current
    ) {
      console.log(data);
      data.current = window.scrollY;
      data.previous += (data.current - data.previous) * data.ease;
      data.rounded = Math.round(data.previous * 100) / 100;
      setScrollPosition(Math.round(data.previous * 100) / 100);

      // ref.current.style.transform = `translate3d(0, -${
      //   data.rounded * speed
      // }px, 0)`;
      ref.current.style.transform = `translate3d(0, -${scrollPosition}px, 0)`;

      // Recursive call
      requestAnimationFrame(() => smoothScrollingHandler());
    }
  };
}
