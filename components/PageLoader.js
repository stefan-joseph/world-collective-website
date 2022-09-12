import styles from "../styles/PageLoader.module.css";
import { useState, useEffect } from "react";
import { Logo } from ".";
import useInterval from "../hooks/useInterval";
import { IoScale } from "react-icons/io5";

function PageLoader({
  pageLoading,
  setBeginPageAnimation,
  beginPageAnimation,
}) {
  const [progress, setProgress] = useState(0);

  useInterval(
    () => {
      // setProgress(progress + 0.5);
      if (pageLoading) setProgress(progress + (100 - progress) * 0.005);
      else setProgress(progress + 0.5);
    },
    progress >= 100 ? null : 10
  );

  useEffect(() => {
    if (progress >= 100 && !pageLoading) setBeginPageAnimation();
  }, [progress, pageLoading]);

  return (
    <div
      className={styles.container}
      style={beginPageAnimation ? { transform: "scale(0)", opacity: 0 } : null}
    >
      <div className={styles.loader}>
        <div className={styles.remaining}>
          <Logo />
        </div>
        <div className={styles.progress} style={{ width: `${progress}%` }}>
          <Logo />
        </div>
        {/* <div className={styles.percentage}>{Math.trunc(progress)}%</div> */}
      </div>
    </div>
  );
}

export default PageLoader;
