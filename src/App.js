import React from "react";

import Nav from "./nav";
import View from "./view";
import Input from "./input";

const App = () => {
  const [tab, setTab] = React.useState("view");

  const content = () => {
    if (tab === "input") {
      return <Input />;
    } else if (tab === "view") {
      return <View />;
    }
  };

  return (
    <main style={{ display: "flex" }}>
      <Nav tab={tab} setTab={setTab} />
      {content()}
    </main>
  );
};

export default App;
