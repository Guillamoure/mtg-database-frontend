import React from "react";
import Card from "./card";
import Container from "./container";

import { getFetch, patchFetch } from "./fetches";

const View = () => {
  const [containers, setContainers] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [viewStatus, setViewStatus] = React.useState(0);
  const [viewCard, setViewCard] = React.useState(null);
  const [viewContainer, setViewContainer] = React.useState(null);

  React.useEffect(() => {
    getFetch("containers").then((data) => {
      setContainers(data);
    });
    getFetch("cards").then((data) => {
      setCards(data);
    });
  }, []);

  React.useEffect(() => {
    if (containers.length) {
      let containersDupe = [...containers].map((con) => {
        let conCards = cards.filter((c) => c.container_id === con.id);
        return { ...con, cards: conCards };
      });
      setContainers(containersDupe);
    }
  }, [cards]);

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
          onClick={() => setViewContainer(c)}
        >
          <strong>{c.name}</strong>
          <div>{c.cards?.length} Cards</div>
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
      let renderChange = (e) => {
        let container_id = e.target.value;
        patchFetch(`cards/${c.id}`, { container_id }).then((data) => {
          let cardsDupe = [...cards].map((card) => {
            if (card.id !== data.id) {
              return card;
            } else {
              return data;
            }
          });
          setCards(cardsDupe);
        });
      };

      let array = containers.map((con) => {
        return <option value={con.id}>{con.name}</option>;
      });

      let location = (
        <select
          name="containers"
          id="containers"
          value={c.container_id}
          onChange={renderChange}
        >
          {array}
        </select>
      );

      return (
        <div
          style={{
            width: "204px",
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
            onClick={() => examine(c)}
          />
          Location: {location}
        </div>
      );
    });
  };

  const examine = (card) => {
    setViewCard(card);
  };

  const filterOutCardFromCards = (id) => {
    let cardsDupe = [...cards].filter((c) => {
      return c.id !== id;
    });
    setCards(cardsDupe);
  };

  return (
    <section id="view">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {renderContainers()}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderCards()}</div>
      {viewCard && (
        <Card
          card={viewCard}
          setViewCard={setViewCard}
          filterOutCardFromCards={filterOutCardFromCards}
        />
      )}
      {viewContainer && (
        <Container
          container={viewContainer}
          setViewContainer={setViewContainer}
        />
      )}
    </section>
  );
};

export default View;
