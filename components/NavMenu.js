import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/NavMenu.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";

const NavMenu = ({ menuIsClosed, toggleMenu }) => {
  const { pathname } = useRouter();

  const imageRefs = useRef([]);
  const currentRefs = useRef([]);
  const menuItemRefs = useRef([]);

  const navMenu = [
    {
      href: "/",
      text: "home",
      img: "/media/images/home-hero.jpg",
    },
    {
      href: "/forests",
      text: "forests",
      img: "/media/images/forest-hero.jpg",
    },
    {
      href: "/mountains",
      text: "mountains",
      img: "/media/images/mountain-hero.jpg",
    },
    {
      href: "/oceans",
      text: "oceans",
      img: "/media/images/ocean-hero.jpg",
    },
    {
      href: "/deserts",
      text: "deserts",
      img: "/media/images/desert-hero.jpg",
    },
  ];

  const getCurrentPageIndex = () => {
    return navMenu.findIndex((item) => item.href === pathname);
  };

  const [displayImageIndex, setDisplayImageIndex] =
    useState(getCurrentPageIndex);

  useEffect(() => {
    swapMenuImage(displayImageIndex);
  }, [displayImageIndex]);

  const revertToDefaultImage = (e) => {
    const defaultImage = getCurrentPageIndex();
    if (
      defaultImage !== displayImageIndex &&
      !e.target.className.includes("page-link")
    ) {
      setDisplayImageIndex(defaultImage);
    }
  };

  const confirmMenuTransitionEnd = (e) => {
    if (e.target.dataset.nav && menuIsClosed === "closing") {
      toggleMenu(true);
    } else if (e.target.dataset.nav && menuIsClosed === "opening") {
      toggleMenu(false);
    }
  };

  const swapMenuImage = (ref) => {
    const images = document.getElementsByClassName("image-container");
    for (let i = 0; i < images.length; i++) {
      images[i].style.opacity = 0;
      images[i].style.zIndex = 10;
    }
    Object.assign(imageRefs.current[ref].style, {
      transition: "none",
      opacity: 0,
      transform: "rotate(7deg) scale(1.3)",
      zIndex: 11,
    });

    // force reflow
    imageRefs.current[ref].focus();

    Object.assign(imageRefs.current[ref].style, {
      transition: "all 1s cubic-bezier(0, 0, 0, 1)",
      opacity: 1,
      transform: "rotate(0deg) scale(1)",
      zIndex: 11,
    });
  };

  useEffect(() => {
    const currentIcon = currentRefs.current.find(
      (ref) => ref.dataset.pathname === pathname
    );
    currentIcon.style.transform = "scale(1)";

    const currentLink = menuItemRefs.current.find(
      (ref) => ref.pathname === pathname
    );
    currentLink.style.pointerEvents = "none";
  }, []);

  return (
    <nav
      onMouseOver={revertToDefaultImage}
      onAnimationEnd={confirmMenuTransitionEnd}
      className={
        menuIsClosed === "closing"
          ? `${styles.navMenuClosed} ${styles.navMenu} closing`
          : !menuIsClosed || menuIsClosed === "opening"
          ? `${styles.navMenu}`
          : `${styles.navMenuClosed} ${styles.navMenu} ${styles.navMenuHide}`
      }
      data-nav={true}
    >
      <div
        className={
          !menuIsClosed || menuIsClosed === "opening"
            ? `${styles.wrapper}`
            : `${styles.wrapper} ${styles.wrapperClose} `
        }
      >
        <div className={styles.container}>
          <ul className={styles.images}>
            {navMenu.map(({ img, text }, index) => (
              <li
                key={text}
                className={`${styles.imageItem} image-container`}
                ref={(e) => {
                  imageRefs.current[index] = e;
                }}
                id="menu-home-unique"
              >
                <div className={styles.image}>
                  <Image
                    src={img}
                    alt={text}
                    layout="fill"
                    className={styles.img}
                  ></Image>
                </div>
              </li>
            ))}
          </ul>
          <ul className={styles.menu}>
            {navMenu.map(({ href, text }, index) => (
              <li key={text} className={styles.label}>
                <div
                  className={styles.current}
                  ref={(e) => {
                    currentRefs.current[index] = e;
                  }}
                  data-pathname={href}
                >
                  <IoLocationSharp />
                </div>
                <Link href={href}>
                  <a
                    className={`${styles.item} page-link`}
                    ref={(e) => {
                      menuItemRefs.current[index] = e;
                    }}
                    onMouseEnter={() => setDisplayImageIndex(index)}
                    onClick={() => toggleMenu("closing")}
                    style={{ "--order": index }}
                  >
                    {text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
