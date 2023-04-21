import styles from "../styles/Navbar.module.css";
import { useEffect, useRef, useState } from "react";
import useFadeOnScroll from "../hooks/useFadeOnScroll";
import { MenuButton, Logo, Badge } from ".";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../hooks/useWindowSize";
import { IoLocationSharp } from "react-icons/io5";

function Navbar({ toggleMenu, menuIsClosed, beginPageAnimation }) {
  const { pathname } = useRouter();

  const logoRef = useRef();
  const navRef = useRef();
  const badgeRef = useRef();
  const menuRef = useRef();

  const navItemRefs = useRef([]);
  const currentRef = useRef();

  useFadeOnScroll({
    ref: logoRef,
    scrollYPosition: 10,
    reverse: false,
  });

  useFadeOnScroll({
    ref: navRef,
    scrollYPosition: 10,
    reverse: false,
  });

  useFadeOnScroll({
    ref: badgeRef,
    scrollYPosition: 200,
    reverse: true,
  });

  const [preventPinDrop, setPreventPinDrop] = useState(true);

  useEffect(() => {
    if (beginPageAnimation) setTimeout(() => setPreventPinDrop(false), 1000);
  }, [beginPageAnimation]);

  useEffect(() => {
    if (!currentRef.current || preventPinDrop) return;
    const dropCurrentLocationIcon = (navItemRef) => {
      currentRef.current.childNodes[0].classList.add(`${styles.minimize}`);
      if (!navItemRef) return;
      const { x, width } = navItemRef.getBoundingClientRect();
      const location = x + width / 2;
      setTimeout(() => {
        currentRef.current.style.transform = `translate3d(${location}px, 0, 0)`;
        currentRef.current.childNodes[0].classList.remove(`${styles.minimize}`);
        currentRef.current.childNodes[0].classList.add(`${styles.maximize}`);
      }, 400);
      setTimeout(() => {
        currentRef.current.childNodes[0].classList.remove(`${styles.maximize}`);
      }, 800);
      window.addEventListener("resize", () => adjustLocationIcon(navItemRef));
    };
    for (let i = 0; i < navItemRefs.current.length; i++) {
      navItemRefs.current[i].style.pointerEvents = "none";
    }
    setTimeout(() => {
      for (let i = 0; i < navItemRefs.current.length; i++) {
        if (navItemRefs.current[i].pathname !== pathname) {
          navItemRefs.current[i].style.pointerEvents = "initial";
        }
      }
    }, 1000);
    const page = navItemRefs.current.find((ref) => ref.pathname === pathname);
    dropCurrentLocationIcon(page);
  }, [pathname, preventPinDrop]);

  const adjustLocationIcon = (navItemRef) => {
    const { x, width } = navItemRef.getBoundingClientRect();
    const location = x + width / 2;
    currentRef.current.style.transform = `translate3d(${location}px, 0, 0)`;
  };

  useEffect(() => {
    const header = document.getElementsByTagName("header");
    document.addEventListener("scroll", () => handleNavColor(header));
    return () =>
      document.removeEventListener("scroll", () => handleNavColor(header));
  }, []);

  const handleNavColor = (header) => {
    const bottomOfHeader = header[0].getBoundingClientRect().bottom;
    const bottomOfBadge = badgeRef.current.getBoundingClientRect().bottom;
    if (bottomOfHeader < bottomOfBadge) {
      badgeRef.current.style.mixBlendMode = "difference";
      menuRef.current.style.mixBlendMode = "difference";
    } else {
      badgeRef.current.style.mixBlendMode = "normal";
      menuRef.current.style.mixBlendMode = "normal";
    }
  };

  const { width } = useWindowSize();

  const nav = [
    { href: "/forests", text: "Forests" },
    { href: "/mountains", text: "Mountains" },
    { href: "/oceans", text: "Oceans" },
    { href: "/deserts", text: "Deserts" },
  ];

  return (
    <div>
      <div ref={logoRef} className={styles.logo}>
        <div
          style={
            beginPageAnimation
              ? {
                  transform: `translateY(0)`,
                  opacity: 1,
                  pointerEvents: "initial",
                }
              : null
          }
        >
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
      </div>
      <div ref={badgeRef} className={styles.badge}>
        <Link href="/">
          <a>
            <Badge />
          </a>
        </Link>
      </div>
      <nav ref={navRef} className={styles.nav}>
        <ul>
          {nav.map(({ href, text }, index) => (
            <li
              key={href}
              style={
                beginPageAnimation
                  ? {
                      transform: `translateY(0)`,
                      opacity: 1,
                      pointerEvents: "initial",
                      "--order": index + 1,
                    }
                  : null
              }
            >
              <Link href={href}>
                <a
                  // className={styles.item}
                  ref={(e) => {
                    navItemRefs.current[index] = e;
                  }}
                >
                  {text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {beginPageAnimation && (
          <div className={styles.container}>
            <div className={styles.current} ref={currentRef}>
              <IoLocationSharp />
            </div>
          </div>
        )}
      </nav>
      <div ref={menuRef} className={styles.menu}>
        <MenuButton
          toggleMenu={toggleMenu}
          menuIsClosed={menuIsClosed}
          mobile={width <= 600 ? true : false}
        />
      </div>
    </div>
  );
}

export default Navbar;
