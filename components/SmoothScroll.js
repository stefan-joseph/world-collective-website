import { useRef } from "react";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function SmoothScroll({ children, menuIsClosed }) {
  const scrollRef = useRef();

  useSmoothScroll({ ref: scrollRef, speed: 1, menuIsClosed });

  return (
    <div className="scroll" ref={scrollRef}>
      {children}
    </div>
  );
}
