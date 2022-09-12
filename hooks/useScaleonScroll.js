import { useEffect, useRef } from "react";
import useIsInViewport from "./useIsInViewport";

export default function useScaleOnScroll(ref, scaleBy, reverse) {
  const isInViewport = useIsInViewport(ref);
  const continueRecursion = useRef(isInViewport);

  useEffect(() => {
    // useRef prevents closure of recursive function over its value
    continueRecursion.current = isInViewport;
    if (!isInViewport) return;
    requestAnimationFrame(scaleOnScrollHandler);
  }, [isInViewport]);

  const scaleOnScrollHandler = () => {
    // doesn't run when ref outside of viewport or is removed from DOM
    if (!continueRecursion.current || !ref.current) return;

    const { height, bottom } =
      ref.current.parentElement.getBoundingClientRect();

    if (!reverse) {
      ref.current.style.transform = `scale(${
        scaleBy - (scaleBy - 1) * (bottom / (innerHeight + height))
      })`;
    } else if (reverse) {
      ref.current.style.transform = `scale(${
        scaleBy - (scaleBy - 1) * (bottom / (innerHeight + height) - 1) * -1
      })`;
    }

    requestAnimationFrame(scaleOnScrollHandler);
  };
}
