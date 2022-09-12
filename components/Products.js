import styles from "../styles/Products.module.css";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useImageSmoothShift from "../hooks/useImageSmoothShift";
import useItemSmoothShift from "../hooks/useItemSmoothShift";
import useWindowSize from "../hooks/useWindowSize";
import useAddCssOnEntrance from "../hooks/useAddCssOnEntrance";

const Products = () => {
  const imageRef1 = useRef();
  const imageRef2 = useRef();

  const itemRef1 = useRef();
  const itemRef2 = useRef();
  const itemRef3 = useRef();
  const itemRef4 = useRef();

  useImageSmoothShift(itemRef1, false, { minWidth: 601 });
  useImageSmoothShift(itemRef2, true, { minWidth: 601 });
  useImageSmoothShift(itemRef3, true, { minWidth: 601 });
  useImageSmoothShift(itemRef4, false, { minWidth: 601 });

  const titleRef1 = useRef();
  const titleRef2 = useRef();
  const titleRef3 = useRef();
  const titleRef4 = useRef();

  useAddCssOnEntrance(titleRef1, {
    opacity: 1,
    // transform: "translate(-50%, -50%) scale(1)",
  });
  useAddCssOnEntrance(titleRef2, {
    opacity: 1,
    // transform: "translate(-50%, -50%) scale(1)",
  });
  useAddCssOnEntrance(titleRef3, {
    opacity: 1,
    // transform: "translate(-50%, -50%) scale(1)",
  });
  useAddCssOnEntrance(titleRef4, {
    opacity: 1,
    // transform: "translate(-50%, -50%) scale(1)",
  });

  const imageRefs = useRef([]);
  const videoRefs = useRef([]);

  // useImageSmoothShift(imageRef1, true);
  // useImageSmoothShift(imageRef2, true);

  const { width, height } = useWindowSize();

  const productLinks = [
    {
      href: "/forests",
      image: "/media/images/forest-hero.jpg",
      video: "/media/videos/forest-medium.mp4",
      // imageRef: imageRef1,
      itemRef: itemRef1,
      titleRef: titleRef1,
      title: ["The", "Forest", "Collection"],
      subtitle: "Take a gander through our forests",
    },
    {
      href: "/mountains",
      image: "/media/images/mountain-hero.jpg",
      video: "/media/videos/mountains-medium2.mp4",
      itemRef: itemRef2,
      titleRef: titleRef2,
      title: ["The", "Mountain", "Collection"],
      subtitle: "Ego's adversary",
      subtitle: "Explore our vast selection of mountains",
    },
    {
      href: "/oceans",
      image: "/media/images/ocean-hero.jpg",
      video: "/media/videos/ocean-medium.mp4",
      itemRef: itemRef3,
      titleRef: titleRef3,
      title: ["The", "Ocean", "Collection"],
      subtitle: "Take a deeper dive into our oceans",
    },
    {
      href: "/deserts",
      image: "/media/images/forest-hero.jpg",
      video: "/media/videos/desert-medium4.mp4",
      itemRef: itemRef4,
      imageRef: imageRef2,
      titleRef: titleRef4,
      title: ["The", "Desert", "Collection"],
      subtitle: "Warm yourself to our deserts",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>{/* <h2 className={styles.title}>Products</h2> */}</div>
        <div className={styles.products}>
          {productLinks.map(
            (
              { href, image, video, title, itemRef, imageRef, titleRef },
              index
            ) => {
              return (
                <div key={href} className={styles.productContainer}>
                  <Link href={href}>
                    <a className={styles.product} ref={itemRef && itemRef}>
                      <div
                        className={styles.block}
                        onMouseOver={() => {
                          imageRefs.current[index].style.opacity = 0;
                          videoRefs.current[index].play();
                        }}
                        onMouseOut={() => {
                          imageRefs.current[index].style.opacity = 1;
                          if (width <= 1200) return;
                          videoRefs.current[index].pause();
                        }}
                      >
                        <picture
                          type="image"
                          className={styles.image}
                          ref={(e) => {
                            imageRefs.current[index] = e;
                          }}
                        >
                          <img
                            src={image}
                            alt=""
                            layout="fill"
                            className={styles.img}
                            ref={imageRef && imageRef}
                          ></img>
                        </picture>
                        <video
                          className={styles.video}
                          ref={(e) => {
                            videoRefs.current[index] = e;
                          }}
                          muted
                          autoPlay
                          loop="loop"
                          playsInline
                          disablePictureInPicture
                        >
                          <source type="video/mp4" src={video}></source>
                        </video>
                        <h3 className={styles.productTitle} ref={titleRef}>
                          {title.map((line) => (
                            <div key={line}>{line}</div>
                          ))}
                        </h3>
                      </div>
                      {/* <div className={styles.label}>
                        <h3 className={styles.info}>{title}</h3>
                      </div> */}
                    </a>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
