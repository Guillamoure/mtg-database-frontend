import React from "react";

import { getFetch } from "./fetches";

const View = () => {
  const [containers, setContainers] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [viewStatus, setViewStatus] = React.useState(0);

  React.useEffect(() => {
    getFetch("containers").then((data) => {
      setContainers(data);
    });
    getFetch("cards").then((data) => {
      setCards(data);
    });
  }, []);

  const renderContainers = () => {
    return [{ name: "View All Cards" }, ...containers].map((c) => {
      return (
        <div
          style={{
            width: "10vw",
            height: "10vw",
            border: "1px solid black",
            padding: "auto",
          }}
        >
          <strong>{c.name}</strong>
        </div>
      );
    });
  };

  const renderCards = () => {
    let array = [...cards];
    if (parseInt(viewStatus) !== 0) {
      array = array.filter((c) => c.container_id === viewStatus);
    }
    return array.map((c) => {
      return (
        <div
          style={{
            width: "200px",
            height: "320px",
            boxSizing: "border-box",
            border: "2px solid black",
            textAlign: "center",
          }}
        >
          <img
            src={c.img}
            alt={c.img}
            style={{
              width: "200px",
              height: "280px",
            }}
          />
          Location: {containers.find((con) => con.id === c.container_id).name}
        </div>
      );
    });
  };

  return (
    <section>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {renderContainers()}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
    </section>
  );
};

export default View;
