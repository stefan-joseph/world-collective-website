import { useRef, forwardRef } from "react";
import useFadeOnScroll from "../hooks/useFadeOnScroll";
import styles from "../styles/Navbar.module.css";

function MenuButton({ toggleMenu, menuIsClosed, mobile }) {
  const buttonRef = useRef();

  useFadeOnScroll({
    ref: buttonRef,
    scrollYPosition: mobile ? 0 : 200,
    reverse: true,
  });

  return (
    <button
      type="button"
      ref={buttonRef}
      // className={styles.button}
      onClick={
        menuIsClosed ? () => toggleMenu("opening") : () => toggleMenu("closing")
      }
      style={{ visibility: mobile ? "inherit" : "hidden" }}
      disabled={menuIsClosed === "closing" || menuIsClosed === "opening"}
    >
      <div className={styles.label}>
        <div>Menu</div>
        {/* <div>Close</div> */}
      </div>
      <div className={styles.icon}>
        {/* <div>〜</div>
        <div>〜</div>
        <div>〜</div> */}
        <div>—</div>
        <div>—</div>
        <div>—</div>
      </div>
    </button>
  );
}

export default MenuButton;
