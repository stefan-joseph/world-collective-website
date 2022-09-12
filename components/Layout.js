import React, { useState, useEffect } from "react";
import { Navbar, NavMenu, SmoothScroll, Footer, PageLoader } from ".";
import usePreventScrolling from "../hooks/usePreventScrolling";
import styles from "../styles/Layout.module.css";
import PageTransition from "./PageTransition";

export default function Layout({ children }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [beginPageAnimation, setBeginPageAnimation] = useState(false);
  const [menuIsClosed, setMenuIsClosed] = useState(true);

  usePreventScrolling([menuIsClosed, beginPageAnimation]);

  useEffect(() => {
    // use while in dev mode
    setTimeout(() => setPageLoading(false), 1500);

    // to bypass cached scroll location on refresh
    // fires during page load animation
    setTimeout(() => window.scrollTo(0, 0), 100);
    window.addEventListener("load", (event) => {
      // console.log("page is fully loaded");
      setPageLoading(false);
    });
  }, []);

  useEffect(() => {
    // to bring in the scrollbar
    if (beginPageAnimation) document.body.style.overflow = "initial";
  }, [beginPageAnimation]);

  return (
    <>
      <PageLoader
        pageLoading={pageLoading}
        setBeginPageAnimation={() => setBeginPageAnimation(true)}
        beginPageAnimation={beginPageAnimation}
      />
      <Navbar
        toggleMenu={(s) => setMenuIsClosed(s)}
        menuIsClosed={menuIsClosed}
        beginPageAnimation={beginPageAnimation}
      />
      <NavMenu
        menuIsClosed={menuIsClosed}
        toggleMenu={(state) => setMenuIsClosed(state)}
      />
      <div
        className={
          !beginPageAnimation
            ? `${styles.pageContainer} ${styles.pageHidden}`
            : !menuIsClosed || menuIsClosed === "opening"
            ? `${styles.pageContainer} ${styles.pageContainerShift}`
            : `${styles.pageContainer} `
        }
      >
        <PageTransition menuIsClosed={menuIsClosed}>
          <div className={styles.underlay}></div>
          <SmoothScroll menuIsClosed={menuIsClosed}>
            {React.cloneElement(children, { beginPageAnimation })}
            <Footer />
          </SmoothScroll>
        </PageTransition>
      </div>
    </>
  );
}
