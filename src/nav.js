import React from "react";

const Nav = ({ tab, setTab }) => {
  const tabChange = (newTab) => {
    if (newTab !== tab) {
      setTab(newTab);
    }
  };
  return (
    <ul
      id="nav"
      style={{
        color: "white",
        backgroundColor: "purple",
        listStyle: "none",
        minHeight: "100vh",
        padding: "5px",
        marginTop: "0",
        paddingTop: "10vh",
        fontSize: "20px",
      }}
    >
      <li
        style={{
          padding: "3px",
          color: tab === "view" ? "mediumseagreen" : "white",
        }}
        onClick={() => tabChange("view")}
      >
        View
      </li>
      <li
        style={{
          padding: "3px",
          color: tab === "input" ? "mediumseagreen" : "white",
        }}
        onClick={() => tabChange("input")}
      >
        Input
      </li>
      <li
        style={{
          padding: "3px",
          color: tab === "search" ? "mediumseagreen" : "white",
        }}
        onClick={() => tabChange("search")}
      >
        Search
      </li>
    </ul>
  );
};

export default Nav;
