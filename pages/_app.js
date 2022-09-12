import "../styles/globals.css";
import { useState } from "react";
import { Layout } from "../components";
// import { AppWrapper } from "../context/appContext";

function MyApp({ Component, pageProps }) {
  // const [menuIsClosed, setMenuIsClosed] = useState(true);

  return (
    // <AppWrapper>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </AppWrapper>
  );
}

export default MyApp;
