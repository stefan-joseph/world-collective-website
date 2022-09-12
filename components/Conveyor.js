import styles from "../styles/Conveyor.module.css";
import { useRef } from "react";
import useAdjustConveyorVelocity from "../hooks/useAdjustConveyorVelocity.js";
import Image from "next/image";

function Conveyor({ images }) {
  const conveyorRef1 = useRef();
  const conveyorRef2 = useRef();

  useAdjustConveyorVelocity(conveyorRef1, 0.01, true);
  useAdjustConveyorVelocity(conveyorRef2, 0.01);

  return (
    <div className={styles.container}>
      <div className={styles.wrapperOne} ref={conveyorRef1}>
        {["1", "2"].map((g, index, array) => {
          return images.map((img, imgIndex, imagesArray) => {
            return (
              <div key={img.src} className={styles.image}>
                <Image
                  src={img}
                  alt=""
                  className={styles.img}
                  loading="eager"
                />
              </div>
            );
          });
        })}
      </div>
      <div className={styles.wrapperTwo} ref={conveyorRef2}>
        {["1", "2"].map((g, index, array) => {
          return images.map((img, imgIndex, imagesArray) => {
            return (
              <div key={img.src} className={styles.image}>
                <Image
                  src={img}
                  alt=""
                  className={styles.img}
                  loading="eager"
                />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Conveyor;
