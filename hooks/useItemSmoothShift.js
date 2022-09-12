import { useEffect } from "react";

export default function useItemSmoothShift({ ref, rate, reverse }) {
  useEffect(() => {
    requestAnimationFrame(() => {
      itemSmoothShiftHandler();
    });
  }, []);

  const itemSmoothShiftHandler = () => {
    if (ref.current) {
      const { bottom, top } = ref.current.getBoundingClientRect();
      // console.log(top);
      // console.log(window.innerHeight);
      if (bottom > 0 && top < window.innerHeight) {
        const { top } = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate3d(0, ${
          reverse ? top * rate : top * -rate
        }px, 0)`;
      }
      // Recursive call
      requestAnimationFrame(() => itemSmoothShiftHandler());
    }
  };
}
