import { useEffect } from "react";
import useIsInViewport from "./useIsInViewport";

export default function addCssOnEntrance(ref, inlineStyles) {
  const isInViewport = useIsInViewport(ref, 1);
  let completed = false;

  useEffect(() => {
    if (isInViewport && !completed) {
      Object.assign(ref.current.style, inlineStyles);
      completed = true;
    }
  }, [isInViewport]);
}
