import styles from "../styles/Page.module.css";
import { Hero, Conveyor, Banner } from "../components";
import forestSmall from "../public/media/images/ocean16.jpg";
import forestLarge from "../public/media/images/ocean15.jpg";
import forest1 from "../public/media/images/ocean11.jpg";
import forest2 from "../public/media/images/ocean12.jpg";
import forest3 from "../public/media/images/ocean13.jpg";
import forest4 from "../public/media/images/ocean14.jpg";

function Oceans({ beginPageAnimation }) {
  return (
    <>
      <Hero
        title={["The", "Ocean", "Collection"]}
        img="media/images/ocean-hero.jpg"
        text={[
          "Lorem ipsum dolor sit amet,",
          "consectetur adipiscing elit,",
          "sed do eiusmod tempor incididunt",
          "ut labore et dolore magna aliqua.",
        ]}
        info={[
          {
            title: "Surface Area",
            info: ["165.2 million km²", "71% of Earth"],
          },
          { title: "Ecosytem", info: ["Aquatic"] },
          {
            title: "Divisions",
            info: ["Pacific", "Atlantic", "Indian", "Southern", "Arctic"],
          },
        ]}
        beginPageAnimation={beginPageAnimation}
      />
      <section className={styles.section}>
        <div className={styles.container}>
          <Banner name="ocean" smallImg={forestSmall} largeImg={forestLarge} />
        </div>
      </section>
      <section className={styles.section}>
        <Conveyor images={[forest1, forest2, forest3, forest4]} />
      </section>
    </>
  );
}

export default Oceans;
