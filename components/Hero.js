import styles from "../styles/Hero.module.css";
import { useRef } from "react";
import useHeroSmoothShift from "../hooks/useHeroSmoothShift";
import useWindowSize from "../hooks/useWindowSize";
import useFadeOnScroll from "../hooks/useFadeOnScroll";
import Image from "next/image";

const Hero = ({ title, img, text, info, beginPageAnimation }) => {
  const headerBackgroundRef = useRef();
  const arrowRef = useRef();

  useHeroSmoothShift(headerBackgroundRef);

  useFadeOnScroll({
    ref: arrowRef,
    scrollYPosition: 10,
    reverse: false,
  });

  const { width, height } = useWindowSize();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.initial}>
          <h1
            className={
              beginPageAnimation
                ? `${styles.title} ${styles.animateTitle}`
                : `${styles.title}`
            }
          >
            {title?.map((line, index) => (
              <div key={line} className={styles.line}>
                {line}
              </div>
            ))}
          </h1>
          <div
            className={
              beginPageAnimation
                ? `${styles.arrow} ${styles.animateArrow}`
                : `${styles.arrow}`
            }
            ref={arrowRef}
          >
            ⤵
          </div>
        </div>
        <div className={styles.additional}>
          <div className={styles.text}>
            {text?.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div className={styles.info}>
            {info?.map(({ title, info }) => (
              <div key={title}>
                <h6>{title}</h6>
                {info?.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <div type="image" className={styles.image} ref={headerBackgroundRef}>
          <img
            src={img}
            alt=""
            className={styles.img}
            // layout="fill"
            // objectFit="cover"
            // objectPosition="bottom"
            // quality="10"
            // priority
            style={width / height <= 1 ? { height: "100vh", top: 0 } : null}
          ></img>
        </div>
      </div>
    </header>
  );
};

export default Hero;
