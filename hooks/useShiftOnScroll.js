import { useEffect, useRef } from "react";
import useIsInViewport from "./useIsInViewport";

export default function useShiftOnScroll(ref, distanceInVw) {
  const isInViewport = useIsInViewport(ref);
  const continueRecursion = useRef(isInViewport);

  useEffect(() => {
    // useRef prevents closure of recursive function over its value
    continueRecursion.current = isInViewport;
    if (!isInViewport) return;
    requestAnimationFrame(shiftOnScrollHandler);
  }, [isInViewport]);

  const shiftOnScrollHandler = () => {
    // doesn't run when ref outside of viewport or is removed from DOM
    if (!continueRecursion.current || !ref.current) return;

    const windowHeight = window.innerHeight;
    const { top } = ref.current.getBoundingClientRect();

    ref.current.style.transform = `translate3d(0, ${
      distanceInVw * ((top / windowHeight - 1) * -1)
    }vw, 0)`;

    requestAnimationFrame(shiftOnScrollHandler);
  };
}
