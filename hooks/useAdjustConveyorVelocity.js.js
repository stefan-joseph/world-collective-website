import { useEffect, useState, useRef } from "react";
import useIsInViewport from "./useIsInViewport";

export default function useAdjustConveyorVelocity(ref, pxPerMs, reverse) {
  const isInViewport = useIsInViewport(ref);
  const continueRecursion = useRef(isInViewport);

  useEffect(() => {
    // useRef prevents closure of recursive function over its value
    continueRecursion.current = isInViewport;
    if (!isInViewport) return;
    requestAnimationFrame(adjustConveyorVelocityHandler);
  }, [isInViewport]);

  let previousTimeStamp, newPos, lastPos, delta;
  let accelerator = 1;

  const [total, setTotal] = useState(0);

  const adjustConveyorVelocityHandler = (timestamp) => {
    // conveyor doesn't run when outside of viewport
    if (!continueRecursion.current || !ref.current) return;

    if (previousTimeStamp === undefined) {
      previousTimeStamp = timestamp;
    }
    let elapsed = timestamp - previousTimeStamp;

    const { y, x, width } = ref.current.getBoundingClientRect();

    newPos = y;
    if (lastPos != null) {
      delta = newPos - lastPos;
      accelerator = Math.min(Math.max(delta / -1 + 1, 1), 40);
    }

    lastPos = newPos;

    //restarts conveyor when it arrives at the end for >=700 & < 700
    if (
      (reverse && innerWidth + x * -1 >= width) ||
      (reverse && innerWidth <= 700 && x <= width / -2) ||
      (!reverse && x >= 0) ||
      (!reverse && innerWidth <= 700 && x >= -(width / 4))
    ) {
      total = 0;
    }

    if (elapsed !== 0) {
      setTotal((total += pxPerMs * elapsed * accelerator));
      if (reverse) {
        ref.current.style.transform = `translate3d(-${total}px, 0, 0)`;
      } else if (!reverse) {
        ref.current.style.transform = `translate3d(${total}px, 0, 0)`;
      }
    }

    previousTimeStamp = timestamp;

    requestAnimationFrame(adjustConveyorVelocityHandler);
  };
}
