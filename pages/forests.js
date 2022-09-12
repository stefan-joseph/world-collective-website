import styles from "../styles/Page.module.css";
import { Hero, Conveyor, Banner } from "../components";
import forestSmall from "../public/media/images/forest5.jpg";
import forestLarge from "../public/media/images/forest6.jpg";
import forest1 from "../public/media/images/forest1.jpg";
import forest2 from "../public/media/images/forest2.jpg";
import forest3 from "../public/media/images/forest3.jpg";
import forest4 from "../public/media/images/forest4.jpg";

function Forests({ beginPageAnimation }) {
  return (
    <>
      <Hero
        title={["The", "Forest", "Collection"]}
        img="media/images/forest-hero.jpg"
        text={[
          "Lorem ipsum dolor sit amet,",
          "consectetur adipiscing elit,",
          "sed do eiusmod tempor incididunt",
          "ut labore et dolore magna aliqua.",
        ]}
        info={[
          { title: "Area", info: ["40.6 million km²", "8% of Earth"] },
          { title: "Ecosytem", info: ["Terrestrial"] },
          { title: "Types", info: ["Tropical", "Temperate", "Boreal"] },
        ]}
        beginPageAnimation={beginPageAnimation}
      />
      <section className={styles.section}>
        <div className={styles.container}>
          <Banner name="forest" smallImg={forestSmall} largeImg={forestLarge} />
        </div>
      </section>
      <section className={styles.section}>
        <Conveyor images={[forest1, forest2, forest3, forest4]} />
        {/* <div className={styles.whiteSpace}></div> */}
      </section>
    </>
  );
}

export default Forests;
