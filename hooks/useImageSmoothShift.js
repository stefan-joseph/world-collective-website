import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

export default function useImageSmoothShift(
  ref,
  reverse,
  { minWidth, maxWidth }
) {
  const [isActive, setIsActive] = useState();

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (minWidth && width < minWidth) setIsActive(false);
    else if (maxWidth && width > maxWidth) setIsActive(false);
    else setIsActive(true);
  }, [width]);

  useEffect(() => {
    if (!isActive) return;
    requestAnimationFrame(() => {
      smoothShiftHandler();
    });
  }, [isActive]);

  const smoothShiftHandler = () => {
    if (!ref.current) return;
    if (innerWidth < minWidth || innerWidth > maxWidth) {
      ref.current.style.transform = `translate3d(0, 0, 0)`;
      return;
    }
    const windowHeight = window.innerHeight;
    const { top, height } = ref.current.parentNode.getBoundingClientRect();
    const { bottom } = ref.current.getBoundingClientRect();
    if (windowHeight > top && bottom > 0) {
      const totalPixels = ref.current.getBoundingClientRect().height - height;
      if (reverse) {
        ref.current.style.transform = `translate3d(0, ${
          totalPixels * ((top / windowHeight - 1) * -1)
        }px, 0)`;
      } else if (!reverse) {
        ref.current.style.transform = `translate3d(0, ${
          totalPixels * ((top / windowHeight - 1) * 1)
        }px, 0)`;
      }
    }
    // Recursive call
    requestAnimationFrame(() => smoothShiftHandler());
  };
}
