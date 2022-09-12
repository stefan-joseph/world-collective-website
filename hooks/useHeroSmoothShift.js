import { useEffect, useRef } from "react";
// import { useAppContext } from "../context/appContext";

export default function useHeroSmoothShift(ref) {
  // const [appState, setAppState] = useAppContext();

  // const viewportRatioQuotientRef = useRef(appState.viewportRatioQuotient);

  // useEffect(() => {
  //   viewportRatioQuotientRef.current = appState.viewportRatioQuotient;
  // }, [appState.viewportRatioQuotient]);

  useEffect(() => {
    requestAnimationFrame(() => {
      heroSmoothShiftHandler();
    });
  }, []);

  const heroSmoothShiftHandler = () => {
    if (ref.current) {
      const { bottom, top, height } =
        ref.current.parentNode.parentNode.getBoundingClientRect();
      // useInViewport for this instead

      if (bottom > 0 || top > window.innerHeight) {
        const amount = ((bottom - height) * -1) / height;
        ref.current.style.opacity = `${1 - 0.8 * amount}`;

        if (innerWidth / innerHeight > 1) {
          ref.current.style.transform = `translate3d(0, ${scrollY / 2}px, 0)`;
        } else {
          ref.current.style.transform = `translate3d(0, ${scrollY}px, 0) scale(${
            1 + 0.3 * amount
          })`;
        }
      }
      // Recursive call
      requestAnimationFrame(() => heroSmoothShiftHandler());
    }
  };
}
