import React from "react";

const Nav = ({ tab, setTab }) => {
  const tabChange = (newTab) => {
    if (newTab !== tab) {
      setTab(newTab);
    }
  };
  return (
    <ul>
      <li onClick={() => tabChange("view")}>View</li>
      <li onClick={() => tabChange("input")}>Input</li>
      <li onClick={() => tabChange("search")}>Search</li>
    </ul>
  );
};

export default Nav;
