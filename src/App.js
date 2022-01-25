import React from "react";

import Nav from "./nav";
import Input from "./input";

const App = () => {
  const [tab, setTab] = React.useState("view");

  const content = () => {
    if (tab === "input") {
      return <Input />;
    }
  };

  return (
    <main>
      <Nav tab={tab} setTab={setTab} />
      {content()}
    </main>
  );
};

export default App;
