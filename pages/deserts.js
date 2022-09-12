import styles from "../styles/Page.module.css";
import { Hero, Conveyor, Banner } from "../components";
import desertSmall from "../public/media/images/desert10.jpg";
import desertLarge from "../public/media/images/desert7.jpg";
import desert6 from "../public/media/images/desert6.jpg";
import desert2 from "../public/media/images/desert12.jpg";
import desert3 from "../public/media/images/desert3.jpg";
import desert4 from "../public/media/images/desert5.jpg";

function Deserts({ beginPageAnimation }) {
  return (
    <>
      <Hero
        title={["The", "Desert", "Collection"]}
        img="media/images/desert-hero.jpg"
        text={[
          "Lorem ipsum dolor sit amet,",
          "consectetur adipiscing elit,",
          "sed do eiusmod tempor incididunt",
          "ut labore et dolore magna aliqua.",
        ]}
        info={[
          { title: "Area", info: ["49.5 million km²", "10% of Earth"] },
          { title: "Ecosytem", info: ["Terrestrial"] },
          { title: "Max Precipitation", info: ["250 mm / year"] },
        ]}
        beginPageAnimation={beginPageAnimation}
      />
      <section className={styles.section}>
        <div className={styles.container}>
          <Banner name="desert" smallImg={desertSmall} largeImg={desertLarge} />
        </div>
      </section>
      <section className={styles.section}>
        <Conveyor images={[desert6, desert2, desert3, desert4]} />
      </section>
    </>
  );
}

export default Deserts;
