import React from "react";
import { Layout } from "antd";
import BounceLoader from "react-spinners/BounceLoader";

function Loader() {
  // let [color, setColor] = React.useState("#A9A9A9");

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <BounceLoader color="#A9A9A9" size={80} />
    </Layout>
  );
}

export default Loader;
