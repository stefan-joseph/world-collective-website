import styles from "../styles/Banner.module.css";
import { useRef } from "react";
import Image from "next/image";
import useShiftOnScroll from "../hooks/useShiftOnScroll";
import useScaleOnScroll from "../hooks/useScaleonScroll";

function Banner({ name, smallImg, largeImg }) {
  const shiftImageRef = useRef();
  const scaleImageRef = useRef();
  const scaleBigImageRef = useRef();

  useShiftOnScroll(shiftImageRef, 6);
  useScaleOnScroll(scaleImageRef, 1.3);
  useScaleOnScroll(scaleBigImageRef, 1.1, true);

  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <h3 className={styles.title}>
          <div>{name}</div>
          <div>Collection</div>
          <div>2022</div>
        </h3>
        <hr className={styles.break} />
        <div className={styles.info}>
          <div>Lorem ipsum dolor sit amet,</div>
          <div>consectetur adipiscing elit,</div>
          <div>sed do eiusmod tempor incididunt</div>
          <div>ut labore et dolore magna aliqua.</div>
        </div>
      </div>
      <div className={styles.images}>
        <div className={styles.big}>
          <div className={styles.item} ref={scaleBigImageRef}>
            <Image src={largeImg} alt="" />
          </div>
        </div>
        <div className={styles.small} ref={shiftImageRef}>
          <div className={styles.item} ref={scaleImageRef}>
            <Image src={smallImg} alt="" className={styles.img} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
