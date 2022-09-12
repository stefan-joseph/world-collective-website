import { useLayoutEffect } from "react";

export default function useFadeOnScroll({ ref, scrollYPosition, reverse }) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    onScroll();
    ref.current.style.transition = "opacity 0.2s linear";
    window.addEventListener("scroll", () => onScroll(), false);
    ref.current.addEventListener("transitionend", hideOnFullFade, false);
    return () => {
      window.removeEventListener("scroll", () => onScroll(), false);
      ref.current.removeEventListener("transitionend", hideOnFullFade, false);
    };
  }, [ref, scrollYPosition]);

  const onScroll = () => {
    if (!ref.current) return;
    if (
      (window.scrollY > scrollYPosition && !reverse) ||
      (window.scrollY < scrollYPosition && reverse)
    ) {
      ref.current.style.opacity = 0;
      ref.current.classList.add("zero-opacity");
    } else if (
      (window.scrollY <= scrollYPosition && !reverse) ||
      (window.scrollY >= scrollYPosition && reverse)
    ) {
      ref.current.style.visibility = "inherit";
      ref.current.style.opacity = 1;
      ref.current.classList.remove("zero-opacity");
    }
  };

  const hideOnFullFade = () => {
    if (ref.current.className.includes("zero-opacity")) {
      ref.current.style.visibility = "hidden";
    }
  };
}
