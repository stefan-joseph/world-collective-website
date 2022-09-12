import styles from "../styles/Footer.module.css";
import { useRef, useEffect, useMemo, useCallback, memo } from "react";
import useIsInViewport from "../hooks/useIsInViewport";
import Link from "next/link";
import { BadgeWithText, Logo } from ".";
import { useRouter } from "next/router";

function Footer() {
  const { pathname } = useRouter();
  const ref = useRef();
  const isInViewport = useIsInViewport(ref);
  const continueRecursion = useRef(isInViewport);

  useEffect(() => {
    const runRecursion = () => {
      if (!continueRecursion.current || !ref.current) return;
      adjustFooter();
      requestAnimationFrame(runRecursion);
    };
    continueRecursion.current = isInViewport;
    if (!isInViewport) return;
    requestAnimationFrame(runRecursion);
  }, [isInViewport]);

  const adjustFooter = () => {
    ref.current.style.transform = `translate3d(0, -${
      Math.max(document.body.clientHeight - (scrollY + innerHeight), 0) / 2
    }px, 0)`;
  };

  const navigate = [
    { href: "/", title: "Home" },
    { href: "/forests", title: "Forests" },
    { href: "/mountains", title: "Mountains" },
    { href: "/oceans", title: "Oceans" },
    { href: "/deserts", title: "Deserts" },
  ];

  const social = [
    { href: "https://www.facebook.com", title: "Facebook" },
    { href: "https://www.instagram.com", title: "Instagram" },
    { href: "https://www.twitter.com", title: "Twitter" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} content-container`} ref={ref}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.row}>
          <ul>
            <li>
              <h6>Navigate</h6>
            </li>
            {navigate.map(({ href, title }) => (
              <li key={title}>
                <Link href={href}>
                  <a
                    className={
                      pathname === href ? styles.selected : styles.selectable
                    }
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <h6>Social</h6>
            </li>
            {social.map(({ href, title }) => (
              <li key={href}>
                <Link href={href}>
                  <a className={styles.selectable}>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <div className={styles.badge}>
              <BadgeWithText />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>Website by Stefan Joseph</div>
          <div>All rights reserved — 2022 © The World Collective</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
