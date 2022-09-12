import { Hero, Products } from "../components";
import homeHero from "../public/media/images/home-hero.jpg";

export default function Home({ beginPageAnimation }) {
  return (
    <>
      <Hero
        title={["The", "World", "Collective"]}
        img="media/images/home-hero.jpg"
        // img={homeHero}
        text={[
          "Lorem ipsum dolor sit amet,",
          "consectetur adipiscing elit,",
          "sed do eiusmod tempor incididunt",
          "ut labore et dolore magna aliqua.",
        ]}
        info={[
          { title: "Area", info: ["510.1 million km²"] },
          { title: "Human Population", info: ["7.97 billion"] },
          { title: "Types", info: ["Tropical", "Temperate", "Boreal"] },
        ]}
        beginPageAnimation={beginPageAnimation}
      />
      <Products />
    </>
  );
}
