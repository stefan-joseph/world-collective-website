import styles from "../styles/Page.module.css";
import { Hero, Conveyor, Banner } from "../components";
import mountainSmall from "../public/media/images/mountain6.jpg";
import mountainLarge from "../public/media/images/mountain5.jpg";
import mountain1 from "../public/media/images/mountain1.jpg";
import mountain2 from "../public/media/images/mountain2.jpg";
import mountain3 from "../public/media/images/mountain3.jpg";
import mountain4 from "../public/media/images/mountain4.jpg";

function Mountains({ beginPageAnimation }) {
  return (
    <>
      <Hero
        title={["The", "Mountain", "Collection"]}
        img="media/images/mountain-hero.jpg"
        text={[
          "Lorem ipsum dolor sit amet,",
          "consectetur adipiscing elit,",
          "sed do eiusmod tempor incididunt",
          "ut labore et dolore magna aliqua.",
        ]}
        info={[
          { title: "Surface Area", info: ["29.8 million km²", "6% of Earth"] },
          { title: "Ecosytem", info: ["Terrestrial"] },
          { title: "Highest Summit", info: ["Mount Everest", "8850m"] },
        ]}
        beginPageAnimation={beginPageAnimation}
      />
      <section className={styles.section}>
        <div className={styles.container}>
          <Banner
            name="mountain"
            smallImg={mountainSmall}
            largeImg={mountainLarge}
          />
        </div>
      </section>
      <section className={styles.section}>
        <Conveyor images={[mountain1, mountain2, mountain3, mountain4]} />
      </section>
    </>
  );
}

export default Mountains;
