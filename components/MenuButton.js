import { useRef, forwardRef } from "react";
import useFadeOnScroll from "../hooks/useFadeOnScroll";
import styles from "../styles/MenuButton.module.css";

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
      className={styles.button}
      onClick={
        menuIsClosed ? () => toggleMenu("opening") : () => toggleMenu("closing")
      }
      style={{ visibility: mobile ? "inherit" : "hidden" }}
      disabled={menuIsClosed === "closing" || menuIsClosed === "opening"}
    >
      <div
        className={
          !menuIsClosed || menuIsClosed === "opening"
            ? styles.labelMakeClose
            : styles.label
        }
      >
        <div className={styles.labelMenu}>Menu</div>
        <div className={styles.labelClose}>Close</div>
      </div>
      <div className={styles.icon}>
        {[...Array(5).keys()].map((div) => (
          <div
            key={div}
            className={
              !menuIsClosed || menuIsClosed === "opening"
                ? `${styles.menuLineHide} `
                : styles.menuLine
            }
          ></div>
        ))}
        {/* <div
          className={
            !menuIsClosed || menuIsClosed === "opening"
              ? `${styles.menuLineHide} `
              : styles.menuLine
          }
        ></div>
        <div
          className={
            !menuIsClosed || menuIsClosed === "opening"
              ? `${styles.menuLineHide}`
              : styles.menuLine
          }
        ></div>
        <div
          className={
            !menuIsClosed || menuIsClosed === "opening"
              ? `${styles.menuLineHide} `
              : styles.menuLine
          }
        ></div>
        <div
          className={
            !menuIsClosed || menuIsClosed === "opening"
              ? `${styles.menuLineHide} ${styles.menuLine}`
              : styles.menuLine
          }
        ></div>
        <div
          className={
            !menuIsClosed || menuIsClosed === "opening"
              ? `${styles.menuLineHide} ${styles.menuLine}`
              : styles.menuLine
          }
        ></div> */}
      </div>
    </button>
  );
}

export default MenuButton;
